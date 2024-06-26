# @license BSD-3 https://opensource.org/licenses/BSD-3-Clause
# Copyright (c) 2021, Institute of Automatic Control - RWTH Aachen University
# All rights reserved. 

using Accessors
using CUDA
using SciGL
using ImageView

WIDTH = 800
HEIGHT = 600

# Create the GLFW window. This sets all the hints and makes the context current.
window = context_offscreen(WIDTH, HEIGHT)

# On Intel copying data from a texture or an RBO does not really make a difference
framebuffer = color_framebuffer(WIDTH, HEIGHT, 3)
texture = framebuffer.attachments[1]
cpu_data = gpu_data(texture)
cu_data = CuArray(cpu_data)

# Compile shader program
normal_prog = GLAbstraction.Program(SimpleVert, NormalFrag)
silhouette_prog = GLAbstraction.Program(SimpleVert, SilhouetteFrag)
depth_prog = GLAbstraction.Program(SimpleVert, DepthFrag)

# Init scene
monkey = upload_mesh(normal_prog, "examples/meshes/monkey.obj")
camera = CvCamera(WIDTH, HEIGHT, 1.2 * WIDTH, 1.2 * WIDTH, WIDTH / 2, HEIGHT / 2) |> Camera
scene = SciGL.Scene(camera, [monkey, monkey])

# create ImageView
guidict = imshow(rand(HEIGHT, WIDTH))
canvas = guidict["gui"]["canvas"]

# Key callbacks GLFW.GetKey does not seem to work
GLFW.SetKeyCallback(window, (win, key, scancode, action, mods) -> begin
    key == GLFW.KEY_ESCAPE && GLFW.SetWindowShouldClose(window, true)
    println("Registered $key")
end)

# Buffer settings
enable_depth_stencil()
set_clear_color()

# Draw to framebuffer
GLAbstraction.bind(framebuffer)

# Draw until we receive a close event
while !GLFW.WindowShouldClose(window)
    # events
    GLFW.PollEvents()
    # Camera rotates around mathematically positive Z
    scene = @set scene.camera.pose.translation = Translation(1.3 * cos(2 * π * time() / 5), 1.3 * sin(2 * π * time() / 5), 0)
    scene = @set scene.camera.pose.rotation = lookat(scene.camera, monkey, [0, 0, 1])

    activate_layer(framebuffer, 1)
    clear_buffers()
    draw(silhouette_prog, scene)

    activate_layer(framebuffer, 2)
    clear_buffers()
    draw(depth_prog, scene)

    activate_layer(framebuffer, 3)
    clear_buffers()
    draw(normal_prog, scene)

    # Display one image
    id = time() ÷ 5 % 3 + 1 |> Int
    # Test if both work and show the same image
    GLAbstraction.unsafe_copyto!(cu_data, framebuffer)
    img = Array(cu_data)[:, :, id]
    img = img |> transpose
    imshow(canvas, img)
    sleep(0.05)
    GLAbstraction.unsafe_copyto!(cpu_data, framebuffer)
    img = cpu_data[:, :, id]
    img = img |> transpose
    imshow(canvas, img)
    sleep(0.05)
end

# needed if you're running this from the REPL
GLFW.DestroyWindow(window)