import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    });
    res.json(todos)
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body;

    const todo = await prisma.todo.create({ 
        data: {
            task,
            userId: req.userId,
        }
    });
    res.json({ id: todo.id, task, completed: 0 })
})

// Update a todo
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: user.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.json({ message: "Todo completed" })
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.userId

    const deletedTodo = await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId: req.userId
        }
    });
    
    res.send({ message: "Todo deleted" })
})

export default router