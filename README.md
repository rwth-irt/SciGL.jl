# SciGL.jl
Port of [scigl_render](https://gitlab.com/rwth-irt-public/flirt/scigl_render) to julia primarily targeted for Bayesian inference.

# Design decisions
I try to incorporate existing Julia packages wherever possible.
The next section contains a list and use cases of the packages.

## Camera and image conventions
The `OpenCV` camera uses the OpenCV conventions which means:
* X: right
* Y: down (OpenGL up)
* Z: forward (OpenGL backward)

Moreover, the resulting images have the origin in the top-left compared to the bottom-left in OpenGL.
Consequently, renderings appear upside down in OpenGL context windows but upright in memory, e.g. when copying from textures to CPU/CUDA arrays.

## Shader naming conventions
**Uniforms**:
- `mat4 model_matrix`: affine transformation matrix to transform model to world coordinates
- `mat4 view_matrix`: affine transformation matrix to transform world to view coordinates
- `mat4 projection_matrix`: perspective transformation matrix from view to clip coordinates
> **Warning** all matrix and vector uniforms must be StaticArrays of type `Float32`

**Vertex Shader Inputs**:
- `vec3 position`: vertex position in model coordinates
- `vec3 normal`: vertex normal in model coordinates
- `vec3 color`: vertex color in model coordinates

**Fragment Shader Inputs**:
- `vec3 model_color`: color of the fragment
- `vec3 model_normal`:  normal vector of the fragment in model coordinates
- `vec4 model_position`: position vector of the fragment in model coordinates
- `vec3 view_normal`: normal vector of the fragment in view coordinates
- `vec4 view_position`: position vector of the fragment in view coordinates
- `vec3 world_normal`: normal vector of the fragment in world coordinates
- `vec4 world_position`: position of the fragment in world coordinates

## Examples meshes
In *examples/meshes* you can find two meshes:
* *cube.obj* is a simple cube of size (1,1,1) meter.
* *monkey.obj* is the Blender Suzanne with Z pointing up and the face pointing in X direction. Size is (0.632, 1, 0.72) meters.

## Package Dependencies
- [CoordinateTransformations](https://github.com/JuliaGeometry/CoordinateTransformations.jl): Representing and chaining transformations like rotations, translations, and perspective transformations.
  [Rotations](https://github.com/JuliaGeometry/Rotations.jl) are handled by the equally named package.
- [GLAbstractions](https://github.com/Tuebel/GLAbstraction.jl): Takes some of the low-level OpenGL pain away.
  Manages the context, compiles shaders, and handles the buffers.
- [ModernGL](https://github.com/JuliaGL/ModernGL.jl): Used by GLAbstractions to interface with the OpenGL driver.
- [GLFW](https://github.com/JuliaGL/GLFW.jl): OpenGL context handling.
- [MeshIO](https://github.com/JuliaIO/MeshIO.jl): Load mesh files like *.obj*, *.ply*, and *.stl*.
  It uses the [FileIO](https://github.com/JuliaIO/FileIO.jl) interface, so this package is also included.

### Reexport
For convenience commonly used symbols are reexported:
- ColorTypes: AbstractRGBA, RGB, RGBA, Gray, red, blue, green, alpha
- CoordinateTransformations: Translation
- GLAbstraction
- GLFW
- Rotations: all symbols


# HPC on Headless Server with VirtualGL
Install [TurboVNC](https://turbovnc.org/Documentation/Documentation) on the server which will be used to instantiate a render context without an attached display.
There are also good [instructions](https://github.com/JuliaGL/GLVisualize.jl/issues/146#issuecomment-289242168) on the GLVisualize github.

Use the following script to launch julia with TurboVNC and NVIDIA as OpenGL vendor:
```bash
#!/bin/sh
DIR="$(cd "$(dirname "$0")" && pwd)"
JULIA=$DIR/julia
# VSCode reads the ouputs of julia -e using Pkg; println.(Pkg.depots())
/opt/TurboVNC/bin/vncserver :6
DISPLAY=:6 __GLX_VENDOR_LIBRARY_NAME=nvidia $JULIA "$@"%
```

Make the file executable via `chmod +x julia_nvidia.sh`

Moreover, you can trick vscode that this file is the julia executable via the setting: "julia.executablePath": "/path/to/julia/bin/julia_nvidia.sh"

> **Tipp:** If you get an unknown CUDA Error (999) during OpenGL interop, you probably render to the integrated device instead of the NVIDIA

# OpenGL.jl devcontainer
Recommended: Install the vscode [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) plugin and load the [devcontainer](https://code.visualstudio.com/docs/remote/containers).
Alternatively install julia locally, activate and instantia the SciGL.jl environment.

## Docker + GPU
On Ubuntu 20.04 and other recent Linux distros, NVIDIA allows for on-demand switching between dedicated and integrated graphics.
This allows to save electricity by only using the dedicated GPU when required.
A choice of Intel or NVIDIA GPUs can be made by (un)commenting the specific lines of the `runArgs` and `containerEnv` in [devcontainer.json](.devcontainer/devcontainer.json).
Alternatively, you could run julia with the environment variables set:
```shell
# NVIDIA GPU
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia julia script.
# Integrated graphics
__GLX_VENDOR_LIBRARY_NAME=mesa julia script.jl
```
You can verify whether the NVIDIA GPU is used in a Julia program by the following command on the host:
```shell
nvidia-smi | grep julia
```

## Docker + GUI in Windows
[Install](https://docs.docker.com/docker-for-windows/wsl/) Docker with the Windows Subsystem for Linux (WSL2) backend.
Unfortunately [GPU support for WSL2](https://www.docker.com/blog/wsl-2-gpu-support-is-here/) is only available for Windows Insiders.
Thus, you will need to install an x-server, for example [VcXsrv](https://sourceforge.net/projects/vcxsrv/).

- Make sure that VcXsrv can communicate through the firewall.
- Uncheck "native opengl"
- Check "Disable Access Control"

Moreover, you will have to modify [.devcontainer/devcontainer.json] since GPU passthrough is not possible:
```json
"runArgs": [
  // Graphics devices only work on native Linux host, comment on Windows
  // Intel
  // "--device=/dev/dri:/dev/dri",
  // Comment if nvidia-docker is unavailable
  // "--gpus=all",
  // Write to X11 server of host
  // "--volume=/tmp/.X11-unix:/tmp/.X11-unix:rw",
],
"containerEnv": {
  // Native Linux host
  // "DISPLAY": "${localEnv:DISPLAY}",
  // Windows host
  "DISPLAY": "host.docker.internal:0.0",
  "LIBGL_ALWAYS_INDIRECT": "0",

  "QT_X11_NO_MITSHM": "1",
  // If NVIDIA Prime Profile On-Demand is active, uncomment both to use NVIDIA GPU
  // Integrated graphics are used otherwise
  "__NV_PRIME_RENDER_OFFLOAD": "1",
  "__GLX_VENDOR_LIBRARY_NAME": "nvidia",
},
```

## Debug in vscode
Later versions of the Julia extension seem to have fixed the issue.

The vscode julia debugger crashes when loading the native OpenGL functions.
Enabling the **Compiled Mode** as described [here](https://www.julia-vscode.org/docs/stable/userguide/debugging/) seems to be a workaround.

## IJupyter
Based on Jupyter, IJupyter can be used for explorative coding.
To use IJupyter, you have two choices:
- Create a *.ipynb* file and open it in vscode.
  The Jupyter extension will automatically launch the Jupyter server.
- Launch `jupyter lab --allow-root` from an integrated terminal.
  Hold Alt + Click the link to open the notebook.
