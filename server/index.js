import express from 'express';
import cors from 'cors';
import multer from 'multer';
import PDFDocument from 'pdfkit';
import pdfParse from 'pdf-parse';
import { db } from './db.js';

const app = express();
const PORT = 3001;

// Setup Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Get all library entries
app.get('/api/library', (req, res) => {
  db.all('SELECT * FROM library_entries ORDER BY updated_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Save a new library entry
app.post('/api/library', (req, res) => {
  const { type, title, content, metadata } = req.body;
  const mt = metadata ? JSON.stringify(metadata) : null;
  
  db.run(
    'INSERT INTO library_entries (type, title, content, metadata) VALUES (?, ?, ?, ?)',
    [type, title, content, mt],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, type, title, content, metadata });
    }
  );
});

// Get translations
app.get('/api/translations', (req, res) => {
  db.all('SELECT * FROM translations ORDER BY created_at DESC LIMIT 50', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Save translation
app.post('/api/translations', (req, res) => {
  const { source_text, translated_text, politeness_level, tags } = req.body;
  const t = tags ? JSON.stringify(tags) : null;

  db.run(
    'INSERT INTO translations (source_text, translated_text, politeness_level, tags) VALUES (?, ?, ?, ?)',
    [source_text, translated_text, politeness_level, t],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Mock login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Echo mock success
  setTimeout(() => {
    res.json({ success: true, token: 'mock-jwt-token', user: { email } });
  }, 800);
});

// Document Translation Endpoint (Mock)
app.post('/api/documents/translate', upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    let sourceTextContext = "No text could be extracted.";
    
    // If it's a PDF, try to extract some text for realistic mocking
    if (req.file.mimetype === 'application/pdf') {
      try {
        const parsed = await pdfParse(req.file.buffer);
        sourceTextContext = parsed.text.substring(0, 200) + '...';
      } catch (e) {
        console.warn('PDF parsing failed, continuing with mock data.', e);
      }
    }

    // Set response headers to prompt a file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="translated_document.pdf"');

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Pipe its output securely to the Express response
    doc.pipe(res);

    doc.fontSize(24).fillColor('#864e5a').text('Kotoba Document Translator', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).fillColor('#45465f').text('Mock Translation Successful', { underline: true });
    doc.moveDown();
    
    doc.fontSize(12).fillColor('#1a1a1a').text('The uploaded Japanese document has been translated into English. In a production environment with an active AI engine, the exact layout and semantics of the Japanese text would be replicated here. This is a generated payload to satisfy the PDF delivery requirement.');
    doc.moveDown(2);

    doc.fontSize(10).fillColor('#666666').text('Original Extracted Context (Snippet):', { underline: true });
    doc.moveDown(0.5);
    doc.text(sourceTextContext);

    // Finalize the PDF and end the stream
    doc.end();

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
