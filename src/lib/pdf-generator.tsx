import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#374151',
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    borderBottom: '1 solid #e5e7eb',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6b7280',
  },
});

interface BorrowingReceiptProps {
  borrowing: {
    id: number;
    borrowedAt: Date;
    dueDate: Date;
    book: {
      title: string;
      author: string;
      isbn?: string;
    };
    user: {
      name: string;
      email: string;
    };
  };
}

export const BorrowingReceipt = ({ borrowing }: BorrowingReceiptProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>University Library</Text>
      <Text style={styles.text}>Borrowing Receipt</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.section}>
        <Text style={styles.title}>Book Details</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Title:</Text> {borrowing.book.title}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Author:</Text> {borrowing.book.author}
        </Text>
        {borrowing.book.isbn && (
          <Text style={styles.text}>
            <Text style={styles.bold}>ISBN:</Text> {borrowing.book.isbn}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Borrowing Information</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Borrowed Date:</Text> {borrowing.borrowedAt.toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Due Date:</Text> {borrowing.dueDate.toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Transaction ID:</Text> #{borrowing.id}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Borrower Information</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Name:</Text> {borrowing.user.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Email:</Text> {borrowing.user.email}
        </Text>
      </View>

      <View style={styles.divider} />
      
      <Text style={styles.text}>
        Please return this book by the due date to avoid late fees.
      </Text>
      <Text style={styles.text}>
        For questions, contact the library at library@university.edu
      </Text>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} | University Library Management System
      </Text>
    </Page>
  </Document>
);
