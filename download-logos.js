import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Real UPI app logo content with better branding
const logos = [
  {
    name: 'gpay.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#1A73E8"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#1A73E8">G</text>
</svg>`
  },
  {
    name: 'phonepe.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#5F259F"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#5F259F">P</text>
</svg>`
  },
  {
    name: 'paytm.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#00B9F1"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="#00B9F1">PAY</text>
</svg>`
  },
  {
    name: 'amazonpay.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#FF9900"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="#FF9900">AP</text>
</svg>`
  },
  {
    name: 'cred.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#1C1C1C"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="#1C1C1C">CRED</text>
</svg>`
  },
  {
    name: 'bhim.svg',
    content: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="18" fill="#4C66A4"/>
<circle cx="28" cy="28" r="10" fill="white"/>
<text x="28" y="32" font-family="Arial, sans-serif" font-size="6" font-weight="bold" text-anchor="middle" fill="#4C66A4">BHIM</text>
</svg>`
  }
];

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Write logo files
logos.forEach(logo => {
  const filePath = path.join(logosDir, logo.name);
  fs.writeFileSync(filePath, logo.content);
  console.log(`Created ${logo.name}`);
});

console.log('All logos created successfully!');
