import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

// Parse arguments
const args = process.argv.slice(2);
let width = 1450;
let height = 350;
let scale = 4; // Default scale multiplier
let port = 3000;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--width' && args[i + 1]) width = parseInt(args[++i], 10);
  if (args[i] === '--height' && args[i + 1]) height = parseInt(args[++i], 10);
  if (args[i] === '--scale' && args[i + 1]) scale = parseFloat(args[++i]);
  if (args[i] === '--port' && args[i + 1]) port = parseInt(args[++i], 10);
}

const SECTIONS = 5;
const OUT_DIR = path.join(process.cwd(), 'ppt-export');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

(async () => {
  console.log(`Starting export...`);
  console.log(`Viewport: ${width}x${height}, Scale: ${scale}`);
  
  // Launch the browser
  const browser = await puppeteer.launch();
  
  for (let i = 1; i <= SECTIONS; i++) {
    const page = await browser.newPage();
    
    // Set the viewport based on arguments
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: scale,
    });
    
    const url = `http://localhost:${port}/?section=${i}`;
    console.log(`Rendering Section ${i} from ${url}...`);
    
    try {
      // Wait for network idle to ensure resources (fonts, images) are loaded
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Give it a little more time for Framer Motion animations to complete
      await new Promise(r => setTimeout(r, 2000));
      
      const outputPath = path.join(OUT_DIR, `section-${i}.png`);
      await page.screenshot({ path: outputPath });
      
      console.log(`Saved: ${outputPath}`);
    } catch (err) {
      console.error(`Failed to export section ${i}:`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Images exported successfully!');

  // Combine images into PDF
  console.log('Generating Narrio.pdf...');
  const pdfDoc = await PDFDocument.create();

  for (let i = 1; i <= SECTIONS; i++) {
    const imagePath = path.join(OUT_DIR, `section-${i}.png`);
    if (fs.existsSync(imagePath)) {
      const imageBytes = fs.readFileSync(imagePath);
      const image = await pdfDoc.embedPng(imageBytes);
      
      // Calculate scaled dimensions to fit the exact width/height we want in the PDF document
      const page = pdfDoc.addPage([width, height]);
      
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const pdfPath = path.join(process.cwd(), 'Narrio.pdf');
  fs.writeFileSync(pdfPath, pdfBytes);
  
  console.log(`Export complete! PDF saved to: ${pdfPath}`);
})();
