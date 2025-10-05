import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return Response.json(
      { message: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
