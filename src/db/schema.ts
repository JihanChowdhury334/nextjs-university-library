import { pgTable, serial, varchar, timestamp, integer, text, boolean, date, decimal } from "drizzle-orm/pg-core";

// Users table (students, faculty, librarians, admins)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("student"), // student, faculty, librarian, admin
  studentId: varchar("student_id", { length: 50 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Book categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Books catalog
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  isbn: varchar("isbn", { length: 20 }),
  publisher: varchar("publisher", { length: 255 }),
  publicationYear: integer("publication_year"),
  description: text("description"),
  coverImage: varchar("cover_image", { length: 500 }),
  totalCopies: integer("total_copies").default(1),
  availableCopies: integer("available_copies").default(1),
  categoryId: integer("category_id").references(() => categories.id),
  location: varchar("location", { length: 100 }), // shelf location
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Book borrowings
export const borrowings = pgTable("borrowings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  borrowedAt: timestamp("borrowed_at").defaultNow(),
  dueDate: date("due_date").notNull(),
  returnedAt: timestamp("returned_at"),
  status: varchar("status", { length: 20 }).default("borrowed"), // borrowed, returned, overdue
  fineAmount: decimal("fine_amount", { precision: 10, scale: 2 }).default("0.00"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Book reservations
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  reservedAt: timestamp("reserved_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  status: varchar("status", { length: 20 }).default("active"), // active, fulfilled, expired, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// Fines for overdue books
export const fines = pgTable("fines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  borrowingId: integer("borrowing_id").references(() => borrowings.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  reason: varchar("reason", { length: 255 }),
  isPaid: boolean("is_paid").default(false),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
