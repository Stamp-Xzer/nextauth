import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST (request) {

    try {
        const { name, email, password } = await request.json()
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password:hashedPassword
            }
        })
        return Response.json({massage: 'user create successfully',
                data:{ newUser }
        })
    }catch (error) {
        return Response.json({error}, {status: 500})
    }

}

