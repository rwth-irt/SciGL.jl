# @license BSD-3 https://opensource.org/licenses/BSD-3-Clause
# Copyright (c) 2023, Institute of Automatic Control - RWTH Aachen University
# All rights reserved. 

using Accessors
using SciGL
using Test

# Create the GLFW window. This sets all the hints and makes the context current.
WIDTH = 800
HEIGHT = 600
DEPTH = 5

gl_context = depth_offscreen_context(WIDTH, HEIGHT, DEPTH, Array)
@testset "OffscreenContext construction" begin
    @test gl_context.render_data isa Array{Float32}
    @test size(gl_context.render_data) == (WIDTH, HEIGHT, DEPTH)
end

# Load scenes
cube_path = joinpath(dirname(pathof(SciGL)), "..", "examples", "meshes", "cube.obj")
cube = upload_mesh(gl_context, cube_path)
cube = @set cube.pose.translation = Translation(0, 0, 0)
camera = CvCamera(WIDTH, HEIGHT, 1.2 * WIDTH, 1.2 * WIDTH, WIDTH / 2, HEIGHT / 2) |> Camera
camera = @set camera.pose.translation = Translation(1.3 * sin(0), 0, 1.3 * cos(0))
camera = @set camera.pose.rotation = lookat(camera, cube)
scene1 = Scene(camera, [cube])
scene2 = @set scene1.camera.pose.translation = Translation(1.3 * sin(0.1), 0, 1.3 * cos(0.1))
scene2 = @set scene2.camera.pose.rotation = lookat(scene2.camera, cube)
scenes = [scene1, scene2]

@testset "OffscreenContext clear_buffers" begin
    activate_layer(gl_context.framebuffer, 1)
    clear_buffers()
    activate_layer(gl_context.framebuffer, 2)
    clear_buffers()
    unsafe_copyto!(gl_context.gl_buffer, gl_context.framebuffer, size(gl_context.render_data)...)
    @test iszero(gl_context.render_data[:, :, 1:2])
end

@testset "OffscreenContext draw one" begin
    img = draw(gl_context, scene1)
    @test img isa SubArray{Float32}
    @test size(img) == (WIDTH, HEIGHT)
    # Anything rendered? And different values per scene?
    @test !iszero(img)
end

@testset "OffscreenContext draw two" begin
    imgs = draw(gl_context, scenes)
    @test imgs isa SubArray{Float32}
    @test size(imgs) == (WIDTH, HEIGHT, 2)
    # Anything rendered? And different values per scene?
    @test !iszero(imgs)
    @test @views imgs[:, :, 1] != imgs[:, :, 2]
end

destroy_context(gl_context)
