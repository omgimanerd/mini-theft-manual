/* global io, Drawing, Input, Game */
/**
 * Client side script that initializes the game.
 *
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

const socket = io()

const canvas = document.getElementById('canvas')

const drawing = new Drawing(canvas.getContext('2d'))
const input = new Input()
const game = new Game(socket, drawing, input)

game.draw()