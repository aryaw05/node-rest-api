import {prismaClient} from "../application/database.js";

// Cek Header Authorization: Middleware pertama-tama memeriksa apakah header Authorization ada dalam permintaan. Jika header tersebut tidak ada, maka permintaan akan ditolak dengan status 401 Unauthorized.

// Cari Pengguna Berdasarkan Token: Jika header Authorization ada, middleware kemudian akan menggunakan nilai token tersebut untuk mencari pengguna di database menggunakan Prisma. Middleware Anda mencari pengguna yang memiliki token yang sama dengan yang diberikan dalam header.

// Cek Keberadaan Pengguna: Jika pengguna ditemukan, middleware akan mengisi req.user dengan data pengguna tersebut, dan kemudian melanjutkan ke langkah berikutnya dalam alur permintaan (next()). Jika tidak ditemukan, permintaan kembali ditolak dengan status 401 Unauthorized.
export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                // token disini merupakan token yang ada di header Authorization yag dikirimkan pada function set di parameter ke 2
                token: token
            }
        });
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}


