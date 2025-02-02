var documenterSearchIndex = {"docs":
[{"location":"scene/#Scene","page":"Scene","title":"Scene","text":"","category":"section"},{"location":"scene/","page":"Scene","title":"Scene","text":"A scene consists of a camera and meshes. All objects in a scene have a pose associated with them.","category":"page"},{"location":"scene/","page":"Scene","title":"Scene","text":"Modules = [SciGL]\nPages   = [\"Scene.jl\"]","category":"page"},{"location":"scene/#SciGL.AbstractCamera","page":"Scene","title":"SciGL.AbstractCamera","text":"AbstractCamera\n\nAbstract type of a camera, which is required in every scene. Must support projection_matrix(camera) which returns a 4x4 SMatrix for the projection transformation to normalized device coordinates.\n\n\n\n\n\n","category":"type"},{"location":"scene/#SciGL.Pose","page":"Scene","title":"SciGL.Pose","text":"Pose{N}\n\nOrientation and position of a scene object with dimensionality N.\n\nThis type is callable and acts like an AffineMap from CoordinateTransformations.jl.\n\n\n\n\n\n","category":"type"},{"location":"scene/#SciGL.Pose-Tuple{AbstractVector, Any}","page":"Scene","title":"SciGL.Pose","text":"Pose(t_xyz, r)\n\nPose from a translation vector and some rotation representation.\n\n\n\n\n\n","category":"method"},{"location":"scene/#SciGL.Scene","page":"Scene","title":"SciGL.Scene","text":"Scene\n\nA scene should consist of only one camera and several meshes. In the future, lights could be supported for rendering RGB images.\n\n\n\n\n\n","category":"type"},{"location":"scene/#SciGL.SceneObject","page":"Scene","title":"SciGL.SceneObject","text":"SceneObject\n\nEach object in a scene has a pose and a shader program attached to it\n\n\n\n\n\n","category":"type"},{"location":"scene/#SciGL.SceneObject-Tuple{T} where T","page":"Scene","title":"SciGL.SceneObject","text":"SceneObject(object, program)\n\nCreates a SceneObject with an identity rotation & zero translation\n\n\n\n\n\n","category":"method"},{"location":"scene/#Base.one-Tuple{Type{<:Pose}}","page":"Scene","title":"Base.one","text":"one(Pose)\n\nReturns a pose which results in the identity transformation.\n\n\n\n\n\n","category":"method"},{"location":"scene/#SciGL.draw-Tuple{GLAbstraction.AbstractProgram, Scene}","page":"Scene","title":"SciGL.draw","text":"draw(program, scene)\n\nDraws the whole scene via the given shader Program. Transfers all the unions (matrices) to the shader Program.\n\n\n\n\n\n","category":"method"},{"location":"mesh/#Meshes","page":"Meshes","title":"Meshes","text":"","category":"section"},{"location":"mesh/","page":"Meshes","title":"Meshes","text":"Load meshes using MeshIO.jl ","category":"page"},{"location":"mesh/","page":"Meshes","title":"Meshes","text":"Modules = [SciGL]\nPages   = [\"MeshModel.jl\"]","category":"page"},{"location":"mesh/#SciGL.draw-Union{Tuple{T}, Tuple{GLAbstraction.AbstractProgram, SceneObject{T}}} where T<:GLAbstraction.VertexArray","page":"Meshes","title":"SciGL.draw","text":"draw(program, scene_object)\n\nDraws the model via the given shader Program. Warning: the location of the unions in the must match those of the program used for the construction of the VertexArray.\n\n\n\n\n\n","category":"method"},{"location":"mesh/#SciGL.to_gpu-Union{Tuple{T}, Tuple{GLAbstraction.AbstractProgram, SceneObject{T}}} where T<:GLAbstraction.VertexArray","page":"Meshes","title":"SciGL.to_gpu","text":"to_gpu(program, scene_object)\n\nTransfers the model matrix to the OpenGL program\n\n\n\n\n\n","category":"method"},{"location":"mesh/#SciGL.upload_mesh-Tuple{GLAbstraction.AbstractProgram, AbstractString}","page":"Meshes","title":"SciGL.upload_mesh","text":"upload_mesh(program, mesh_file)\n\nLoad a mesh from a file an upload it to the GPU as VertexArray.\n\n\n\n\n\n","category":"method"},{"location":"mesh/#SciGL.upload_mesh-Tuple{GLAbstraction.AbstractProgram, GeometryBasics.AbstractMesh}","page":"Meshes","title":"SciGL.upload_mesh","text":"upload_mesh(program, mesh)\n\nUpload a Mesh to the GPU as VertexArray.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#OffscreenContext","page":"OffscreenContext","title":"OffscreenContext","text":"","category":"section"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Simple entrypoint for rendering and transferring to CPU / CUDA.","category":"page"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Modules = [SciGL]\nPages   = [\"OffscreenContext.jl\"]","category":"page"},{"location":"offscreencontext/#SciGL.OffscreenContext","page":"OffscreenContext","title":"SciGL.OffscreenContext","text":"OffscreenContext\n\nKeep everything required for offscreen rendering and transfer to a (Cu)Array in one place.\n\nHigh level API draw(context, scenes...): Synchronously draws and transfers the scenes to the (Cu)Array. During construction the context's framebuffer is bound once. Make sure to bind it again if you unbind it.\n\nLow level API might be useful if you have calculations to execute during the transfer:\n\ndraw_framebuffer draws a scene to the texture attachment of the framebuffer\nstart_transfer to asynchronously transfer framebuffer → gl_buffer / render_data\nwait_transfer to wait for the transfer to finish\nCreate a view via @view render_data[:, :, 1:n_images] which now contains the n_images renderings.\n\nWARN Does not obey Julia image conventions but returns (x,y,z) instead (y,x,z) coordinates. PermutedDimsArrays are not CUDA compatible due to scalar indexing and transposing via permutedims is quite expensive.\n\n\n\n\n\n","category":"type"},{"location":"offscreencontext/#SciGL.color_offscreen_context-Union{Tuple{T}, Tuple{Integer, Integer}, Tuple{Integer, Integer, Integer}, Tuple{Integer, Integer, Integer, Type{T}}, Tuple{Integer, Integer, Integer, Type{T}, Any}} where T","page":"OffscreenContext","title":"SciGL.color_offscreen_context","text":"color_offscreen_context(width, height, [depth=1, array_type=Array, shaders=(SimpleVert, NormalFrag)])\n\nSimplified generation of an OpenGL context for rendering images of a specific size. Batched rendering is enabled by generating a 3D Texture of RGBA pixels with size (width, height, depth). Specify the array_type as Array or CuArray.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.depth_offscreen_context-Union{Tuple{T}, Tuple{Integer, Integer}, Tuple{Integer, Integer, Integer}, Tuple{Integer, Integer, Integer, Type{T}}} where T","page":"OffscreenContext","title":"SciGL.depth_offscreen_context","text":"depth_offscreen_context(width, height, [depth=1, array_type=Array])\n\nSimplified generation of an OpenGL context for rendering depth images of a specific size. Batched rendering is enabled by generating a 3D Texture of Float32 with size (width, height, depth). Specify the array_type as Array or CuArray.\n\nThe resulting OffscreenContext's render_data has the array_type{Float32} which allows seamless a transfer of the depth values from the texture. \n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.distance_offscreen_context-Union{Tuple{T}, Tuple{Integer, Integer}, Tuple{Integer, Integer, Integer}, Tuple{Integer, Integer, Integer, Type{T}}} where T","page":"OffscreenContext","title":"SciGL.distance_offscreen_context","text":"distance_offscreen_context(width, height, [depth=1, array_type=Array])\n\nSimplified generation of an OpenGL context for rendering distance maps of a specific size. While depth images simply contain the z coordinate, distance maps contain the euclidean distance of the point from the camera. Batched rendering is enabled by generating a 3D Texture of Float32 with size (width, height, depth). Specify the array_type as Array or CuArray.\n\nThe resulting OffscreenContext's render_data has the array_type{Float32} which allows seamless a transfer of the distance values from the texture. \n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.draw-Tuple{OffscreenContext, AbstractArray{<:Scene}}","page":"OffscreenContext","title":"SciGL.draw","text":"draw(context, scenes)\n\nSynchronously draw the scenes into the layers of the contxt's framebuffer and transfer it to the render_data of the context. Returns a view of of size (width, height, length(scenes)).\n\nWARN: Overwrites the data in the context, copy it if you need it to persist!\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.draw-Tuple{OffscreenContext, Scene}","page":"OffscreenContext","title":"SciGL.draw","text":"draw(context, scene)\n\nSynchronously transfer the image with the given depth from OpenGL to the render_data. Returns a view of of size (width, height).\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.draw_framebuffer","page":"OffscreenContext","title":"SciGL.draw_framebuffer","text":"draw_framebuffer(context, scene, [layer_id=1])\n\nRender the scene to the framebuffer of the context.\n\n\n\n\n\n","category":"function"},{"location":"offscreencontext/#SciGL.start_transfer","page":"OffscreenContext","title":"SciGL.start_transfer","text":"start_transfer(context, [depth=1])\n\nStart the asynchronous transfer the image with the given depth from OpenGL to the render_data.\n\nWARN: Overwrites the data in the context, copy it if you need it to persist!\n\n\n\n\n\n","category":"function"},{"location":"offscreencontext/#SciGL.to_device-Union{Tuple{T}, Tuple{OffscreenContext{<:Any, <:Any, T}, AbstractArray}} where T","page":"OffscreenContext","title":"SciGL.to_device","text":"to_device(context, A)\n\nTransfer A to the device of the render data, e.g. Array or CuArray\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.transfer-Tuple{OffscreenContext, Any}","page":"OffscreenContext","title":"SciGL.transfer","text":"transfer(context, depth)\n\nSynchronously transfer the image from OpenGL to the render_data. Returns a view of of size (width, height, depth).\n\nWARN: Overwrites the data in the context, copy it if you need it to persist!\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.transfer-Tuple{OffscreenContext}","page":"OffscreenContext","title":"SciGL.transfer","text":"transfer(context)\n\nSynchronously transfer the image from OpenGL to the render_data. Returns a view of of size (width, height).\n\nWARN: Overwrites the data in the context, copy it if you need it to persist!\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.wait_transfer","page":"OffscreenContext","title":"SciGL.wait_transfer","text":"start_transfer(context, [timeout_ns=10])\n\nWait for the transfer started in start_transfer to finish. Allows to set the timeout in nanoseconds of the glClientWaitSync call in the sync loop.\n\n\n\n\n\n","category":"function"},{"location":"offscreencontext/#Context-Creation","page":"OffscreenContext","title":"Context Creation","text":"","category":"section"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Manually create and destroy standalone contexts. Compared to the OffscreenContext batteries are not included, i.e. no textures to render to.","category":"page"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Modules = [SciGL]\nPages   = [\"RenderContexts.jl\"]","category":"page"},{"location":"offscreencontext/#SciGL.clear_buffers-Tuple{}","page":"OffscreenContext","title":"SciGL.clear_buffers","text":"clear_buffers()\n\nClears color, depth, and stencil.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.context_fullscreen-Tuple{Integer, Integer}","page":"OffscreenContext","title":"SciGL.context_fullscreen","text":"context_fullscreen(width, height; name, window_hints)\n\nCreate an OpenGL context in fullscreen mode and makes it current.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.context_offscreen-Tuple{Integer, Integer}","page":"OffscreenContext","title":"SciGL.context_offscreen","text":"context_offscreen(width, height; name, window_hints)\n\nCreate an OpenGL context which is not visible, e.g. for offscreen rendering and makes it current.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.context_window-Tuple{Integer, Integer}","page":"OffscreenContext","title":"SciGL.context_window","text":"context_window(width, height; name, window_hints)\n\nCreate an OpenGL context in windowed mode and makes it current.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.destroy_context-Tuple{GLFW.Window}","page":"OffscreenContext","title":"SciGL.destroy_context","text":"destroy_context(context)\n\nGeneralization of GLFW.DestroyWindow\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.enable_depth_stencil-Tuple{}","page":"OffscreenContext","title":"SciGL.enable_depth_stencil","text":"enable_depth_stencil()\n\nEnable depth and stencil testing\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#SciGL.set_clear_color","page":"OffscreenContext","title":"SciGL.set_clear_color","text":"set_clear_color(color)\n\nSet a color which is used for glClear(GLCOLORBUFFER_BIT), default is black\n\n\n\n\n\n","category":"function"},{"location":"offscreencontext/#SciGL.set_context!-Tuple{GLFW.Window}","page":"OffscreenContext","title":"SciGL.set_context!","text":"set_context!(window)\n\nUse this context for the current thread.\n\n\n\n\n\n","category":"method"},{"location":"offscreencontext/#Layered-Rendering","page":"OffscreenContext","title":"Layered Rendering","text":"","category":"section"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Low level interface to switch layers.","category":"page"},{"location":"offscreencontext/","page":"OffscreenContext","title":"OffscreenContext","text":"Modules = [SciGL]\nPages   = [\"Layers.jl\"]","category":"page"},{"location":"offscreencontext/#SciGL.activate_layer-Tuple{GLAbstraction.FrameBuffer, Int64}","page":"OffscreenContext","title":"SciGL.activate_layer","text":"activate_layer(frambeuffer, id)\n\nActivates layer of the first attachement to framebuffer. Does not for RBOs since they are inherently 2D.\n\n\n\n\n\n","category":"method"},{"location":"camera/#Camera","page":"Camera","title":"Camera","text":"","category":"section"},{"location":"camera/","page":"Camera","title":"Camera","text":"Use calibrated cameras in OpenCV convention:","category":"page"},{"location":"camera/","page":"Camera","title":"Camera","text":"The camera looks along the positive Z-axis, with X → right and Y → down.\nThe resulting image has its origin in the top-left with: X → right and Y → down.","category":"page"},{"location":"camera/","page":"Camera","title":"Camera","text":"Modules = [SciGL]\nPages   = [\"Camera.jl\"]","category":"page"},{"location":"camera/#SciGL.Camera","page":"Camera","title":"SciGL.Camera","text":"Camera(cv_camera, [orthographic_camera=OrthographicCamera(cv_camera)])\n\nCreates a SceneObject{Camera} which contains the projection matrix of the cvcamera. Optionally a custom orthographiccamera can be provided, e.g. for cropping views.\n\n\n\n\n\n","category":"type"},{"location":"camera/#SciGL.Camera-2","page":"Camera","title":"SciGL.Camera","text":"Camera\n\nStrongly typed camera type which contains a static projection matrix.\n\n\n\n\n\n","category":"type"},{"location":"camera/#SciGL.CvCamera","page":"Camera","title":"SciGL.CvCamera","text":"CvCamera\n\nA Camera parametrized like OpenCV. The convention is as in OpenCV: x-right, y-down, z-forward. Construct a Camera from it to be used in the shaders\n\n\n\n\n\n","category":"type"},{"location":"camera/#SciGL.CvCamera-NTuple{6, Any}","page":"Camera","title":"SciGL.CvCamera","text":"CvCamera(width, height, f_x, f_y, c_x, c_y; [s=0, distortion=zeros(8), near=0.01, far=100])\n\nConstructor with reasonable defaults\n\nParameters\n\nwidth horizontal resolution [pixel]\nheight: vertical resolution in [pixel]\nf_x: horizontal focal length [pixel/m]\nf_y: vertical focal length [pixel/m]\nc_x: horizontal center offset [pixel]\nc_y: vertical center offset [pixel]\ns: axis skew\ndistortion: distortion coefficients\nnear: near plane for OpenGL\nfar: far plane for OpenGL\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.OrthographicCamera","page":"Camera","title":"SciGL.OrthographicCamera","text":"GLOrthographicCamera\n\nParametrizes an OrthographicCamera which transforms a cuboid space with the given parameters ([left,bottom,near],[right,top,far]) to normalized device coordinates ([-1,-1,-1],[1,1,1]).\n\n\n\n\n\n","category":"type"},{"location":"camera/#SciGL.OrthographicCamera-Tuple{CvCamera}","page":"Camera","title":"SciGL.OrthographicCamera","text":"OrthographicCamera(c::CvCamera)\n\nExtracts the orthographic scaling from the OpenCV camera. Since the origin in OpenGL is in the bottom-left and in OpenCV in the top-left, images will appear upside down in the OpenGL window but upright in memory.\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.crop-Tuple{CvCamera, Vararg{Any, 4}}","page":"Camera","title":"SciGL.crop","text":"crop(cv_camera, left, right, top, bottom)\n\nCreates a SceneObject{Camera} which contains the projection matrix of the cvcamera. This camera does not render the full size image of the cvcamera but only the area described by the bounding box (1, 1, width, height) → (left, right, top, bottom). Uses Julia indices starting at 1 and including the right & bottom, like img[left:right,top:bottom]. Does not clamp the values since an image can still be rendered.\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.crop_size-NTuple{4, Any}","page":"Camera","title":"SciGL.crop_size","text":"crop_size(left, right, top, bottom)\n\nSize of the corresponding to img[left:right,top:bottom]\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.lookat","page":"Camera","title":"SciGL.lookat","text":"lookat(camera_t, object_t, [up=[0,-1.0]])\n\nCalculates the Rotation to look at the object along positive Z with up defining the upwards direction. Default is the OpenCV convention: up = negative Y.\n\n\n\n\n\n","category":"function"},{"location":"camera/#SciGL.orthographic_matrix-Tuple{OrthographicCamera}","page":"Camera","title":"SciGL.orthographic_matrix","text":"orthographic_matrix(c::GLOrthoCamera)\n\nCalculates the orthographic projection matrix like glOrtho\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.perspective_matrix-Tuple{CvCamera}","page":"Camera","title":"SciGL.perspective_matrix","text":"perspective_matrix(cv_camera)\n\nGenerate the perspective transformation matrix from the OpenCV camera parameters. Takes care of the OpenGL vs. OpenCV convention:\n\nlooking down negative Z vs. positive Z\nup in image is positive Y vs. negative Y\n\nThus, use the OpenCV convention in following steps.\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.to_gpu-Tuple{GLAbstraction.AbstractProgram, SceneObject{<:AbstractCamera}}","page":"Camera","title":"SciGL.to_gpu","text":"to_gpu(program, scene_camera)\n\nTransfers the view and projection matrices to the OpenGL program\n\n\n\n\n\n","category":"method"},{"location":"camera/#SciGL.view_matrix-Tuple{SceneObject{<:AbstractCamera}}","page":"Camera","title":"SciGL.view_matrix","text":"view_matrix(so::SceneObject{<:AbstractCamera})\n\nCalculates the view matrix for a camera pose. The convention is as in OpenCV: x-rigth, y-down, z-forward\n\n\n\n\n\n","category":"method"},{"location":"#SciGL.jl","page":"SciGL.jl","title":"SciGL.jl","text":"","category":"section"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Port of scigl_render to julia.","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"The primary goal is to enable efficient rendering of multiple scenes and transferring the images to a compute device (CPU or CUDA) for Scientific calculations.","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"This is achieved by rendering to different layers of a 3D texture (width, height, depth) via glFramebufferTextureLayer. Pixel pack buffer objects are used to transfer data from OpenGL to the CPU or CUDA. Have a look at OffscreenContext which provides a simple interface for rendering and transferring the data.","category":"page"},{"location":"#Conventions","page":"SciGL.jl","title":"Conventions","text":"","category":"section"},{"location":"#Camera-and-image-conventions","page":"SciGL.jl","title":"Camera and image conventions","text":"","category":"section"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"The OpenCV camera uses the OpenCV conventions which means:","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"X: right\nY: down (OpenGL up)\nZ: forward (OpenGL backward)","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Moreover, the resulting images have the origin in the top-left compared to the bottom-left in OpenGL. Consequently, renderings appear upside down in OpenGL context windows but upright in memory, e.g. when copying from textures to CPU or CUDA arrays.","category":"page"},{"location":"#Shader-naming-conventions","page":"SciGL.jl","title":"Shader naming conventions","text":"","category":"section"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Uniforms:","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"mat4 model_matrix: affine transformation matrix to transform model to world coordinates\nmat4 view_matrix: affine transformation matrix to transform world to view coordinates\nmat4 projection_matrix: perspective transformation matrix from view to clip coordinates","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Warning all matrix and vector uniforms must be StaticArrays of type Float32","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Vertex Shader Inputs:","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"vec3 position: vertex position in model coordinates\nvec3 normal: vertex normal in model coordinates\nvec3 color: vertex color in model coordinates","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"Fragment Shader Inputs:","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"vec3 model_color: color of the fragment\nvec3 model_normal:  normal vector of the fragment in model coordinates\nvec4 model_position: position vector of the fragment in model coordinates\nvec3 view_normal: normal vector of the fragment in view coordinates\nvec4 view_position: position vector of the fragment in view coordinates\nvec3 world_normal: normal vector of the fragment in world coordinates\nvec4 world_position: position of the fragment in world coordinates","category":"page"},{"location":"#Example-meshes","page":"SciGL.jl","title":"Example meshes","text":"","category":"section"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"In examples/meshes you can find two meshes:","category":"page"},{"location":"","page":"SciGL.jl","title":"SciGL.jl","text":"cube.obj is a simple cube of size (1,1,1) meter.\nmonkey.obj is the Blender Suzanne with Z pointing up and the face pointing in X direction. Size is (0.632, 1, 0.72) meters.","category":"page"},{"location":"transformations/#Transformations","page":"Transformations","title":"Transformations","text":"","category":"section"},{"location":"transformations/","page":"Transformations","title":"Transformations","text":"Common objects and transformation functions for 3D transformations.","category":"page"},{"location":"transformations/","page":"Transformations","title":"Transformations","text":"Modules = [SciGL]\nPages   = [\"Transformations.jl\"]","category":"page"},{"location":"transformations/#CoordinateTransformations.AffineMap-Tuple{Pose, Scale}","page":"Transformations","title":"CoordinateTransformations.AffineMap","text":"SMatrix(p::pose, s::Scale)\n\nCreates the active transformation by first scaling, then rotating and finally translating\n\n\n\n\n\n","category":"method"},{"location":"transformations/#CoordinateTransformations.AffineMap-Tuple{Pose}","page":"Transformations","title":"CoordinateTransformations.AffineMap","text":"AffineMap(p::Pose)\n\nCreates the active transformation by first rotating and then translating\n\n\n\n\n\n","category":"method"},{"location":"transformations/#StaticArraysCore.SMatrix-Tuple{CoordinateTransformations.AbstractAffineMap}","page":"Transformations","title":"StaticArraysCore.SMatrix","text":"SMatrix(a::AffineMap)\n\nConverts an AffineMap to a static affine transformation matrix.\n\n\n\n\n\n","category":"method"},{"location":"transformations/#StaticArraysCore.SMatrix-Tuple{Pose, Scale}","page":"Transformations","title":"StaticArraysCore.SMatrix","text":"SMatrix(p::pose, s::Scale)\n\nConverts a Pose and Scale to an affine transformation matrix. Convention: (t ∘ r ∘ s)(x)\n\n\n\n\n\n","category":"method"},{"location":"transformations/#StaticArraysCore.SMatrix-Tuple{Pose}","page":"Transformations","title":"StaticArraysCore.SMatrix","text":"SMatrix(p::pose)\n\nConverts a Pose to an affine transformation matrix. Convention: (t ∘ r)(x)\n\n\n\n\n\n","category":"method"},{"location":"transformations/#SciGL.augmented_matrix-Union{Tuple{N}, Tuple{StaticArraysCore.SMatrix{N, N}, StaticArraysCore.SVector{N}}} where N","page":"Transformations","title":"SciGL.augmented_matrix","text":"augmented_matrix(M, v)\n\nConverts a linear map and a translation vector to an augmented affine transformation matrix. The matrix is of type Float32 and row major for OpenGL.\n\n\n\n\n\n","category":"method"},{"location":"transformations/#SciGL.decompose-Union{Tuple{AffineMap{<:AbstractMatrix, <:StaticArraysCore.SVector{N}}}, Tuple{N}} where N","page":"Transformations","title":"SciGL.decompose","text":"decompose(a::AbstractAffineMap)\n\nExtract the linear map and translation as matrix and vector. OpenGL requires element types of Float32.\n\n\n\n\n\n","category":"method"}]
}
