__precompile__()

module SciGL

# Dependencies
# TODO not use whole libs
using ColorTypes: AbstractRGBA, RGB, RGBA, Gray, red, blue, green, alpha
using CoordinateTransformations
using FixedPointNumbers: N0f8, Normed
using GeometryBasics
using GLAbstraction
using GLFW
using FileIO
using MeshIO
using ModernGL
using LinearAlgebra
using Rotations
using StaticArrays

# lib includes
include("BaseExtensions.jl")
include("Scene.jl")
include("RenderContexts.jl")
include("Transformations.jl")
include("Camera.jl")
include("Shaders.jl")
include("MeshModel.jl")
include("FrameBuffer.jl")
include("Layers.jl")
include("Tiles.jl")
include("Sync.jl")
include("Cuda.jl")

# Scene types
export CvCamera
export GLOrthoCamera
export Pose
export SceneObject
export Scene

# Shaders
export DepthFrag
export ModelNormalFrag
export NormalFrag
export SilhouetteFrag
export SimpleVert

# Export functions
export clear_buffers
export color_framebuffer
export color_framebuffer_rbo
export context_fullscreen
export context_offscreen
export context_window
export depth_framebuffer
export depth_framebuffer_rbo
export draw
export enable_depth_stencil
export load_mesh
export lookat
export set_clear_color
export to_gpu

# Tiled rendering
export Tiles

export activate_all
export activate_tile
export coordinates
export tile_length
export tile_size
export full_size

# Layered rendering
export activate_layer

# Synchronized rendering of tiles
export render_channel
export draw_to_cpu
export draw_to_cpu_async

end # module
