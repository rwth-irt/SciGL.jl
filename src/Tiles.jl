# @license BSD-3 https://opensource.org/licenses/BSD-3-Clause
# Copyright (c) 2022, Institute of Automatic Control - RWTH Aachen University
# All rights reserved. 
using ModernGL

"""
    Tiles
For tiled rendering, containing n tiles of `x_tiles`×`y_tiles`. 
Each tile has the dimensions `width`×`height`.
"""
struct Tiles
    tile_width::Int64
    tile_height::Int64
    n_tiles::Int64
    x_tiles::Int64
    y_tiles::Int64
end

"""
    length(tiles)
Number of tiles.
"""
Base.length(tiles::Tiles) = tiles.n_tiles

"""
    size(tiles)
Size of the full rendered image.
"""
Base.size(tiles::Tiles) = (tiles.x_tiles * tiles.tile_width, tiles.y_tiles * tiles.tile_height)

"""
    Tiles n_tiles::Int, width::Int, height
For tiled rendering, containing `n` tiles of size `width`×`height`. 
"""
function Tiles(n_tiles::Int, width::Int, height::Int)
    (x_tiles, y_tiles) = tiles_size(n_tiles, width, height)
    Tiles(width, height, n_tiles, x_tiles, y_tiles)
end

"""
    tiles_size(n_tiles, width, height)
Calculates the minimal size of a raster to render `n_tiles` of the size `(width, height)`.
"""
function tiles_size(n_tiles::Int, width::Int, height::Int)
    max_size = GLAbstraction.glGetIntegerv(GL_MAX_RENDERBUFFER_SIZE)
    max_x = trunc(Int64, max_size / width)
    max_y = trunc(Int64, max_size / height)
    if n_tiles <= 0 || n_tiles > max_x * max_y
        return (0, 0)
    end
    # minimum needed views per column and row (ceil int division)
    min_x = ceil(Int64, n_tiles / max_x)
    min_y = ceil(Int64, n_tiles / min_x)
    (min_x, min_y)
end


"""
    gl_tile_indices(tiles, id)
Calculates the OpenGL indices of the i-th tile.
"""
gl_tile_indices(tiles::Tiles, id::Int) = mod((id - 1), tiles.x_tiles), trunc(Int64, (id - 1) / tiles.x_tiles)

"""
    tile_indices(tiles, id)
Calculates the Julia indices of the i-th tile.
"""
function tile_indices(tiles::Tiles, id::Int)
    x, y = gl_tile_indices(tiles, id)
    x + 1, y + 1
end

"""
    view_tile(M, tiles, id)
Create a view of the Matrix `M` for the given tile id.
"""
function view_tile(M::AbstractMatrix, tiles::Tiles, id::Int)
    x, y = gl_tile_indices(tiles, id)
    x0 = x * tiles.tile_width + 1
    y0 = y * tiles.tile_height + 1
    x1 = x0 + tiles.tile_width - 1
    y1 = y0 + tiles.tile_height - 1
    view(M, x0:x1, y0:y1)
end

"""
    activate_tile(tiles, id)
Set the viewport and scissors to the given tile id.
"""
function activate_tile(tiles::Tiles, id::Int)
    x, y = gl_tile_indices(tiles, id)
    x0 = x * tiles.tile_width
    y0 = y * tiles.tile_height
    glViewport(x0, y0, tiles.tile_width, tiles.tile_height)
    glScissor(x0, y0, tiles.tile_width, tiles.tile_height)
    glEnable(GL_SCISSOR_TEST)
end

"""
    activate_all(tiles)
Activates the viewport and scissors for all tiles.
"""
function activate_all(tiles::Tiles)
    glViewport(0, 0, size(tiles)...)
    glDisable(GL_SCISSOR_TEST)
end
