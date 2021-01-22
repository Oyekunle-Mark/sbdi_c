import express, { Response } from 'express'

const app = express()

const port = 5000

app.get('/', (_, res: Response) => {
  res.status(200).send('Server up.')
})

app.listen(port, () => console.log(`Running on port ${port}`))
