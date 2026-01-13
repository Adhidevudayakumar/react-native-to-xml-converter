#!/usr/bin/env node
// CLI entry point

import * as fs from 'fs';
import * as path from 'path';
import { convertRNToXML } from '../index';

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);
  
  // Check if file path is provided
  if (args.length === 0) {
    console.error('❌ Error: No input file specified');
    console.log('\nUsage: npx rn-to-xml <input-file.ts|tsx>');
    console.log('Example: npx rn-to-xml example.ts');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const absolutePath = path.resolve(process.cwd(), inputFile);
  
  // Check if file exists
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Error: File not found: ${inputFile}`);
    process.exit(1);
  }
  
  // Read input file
  let code: string;
  try {
    code = fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Error reading file: ${(error as Error).message}`);
    process.exit(1);
  }
  
  // Convert to XML
  let xml: string;
  try {
    console.log('🔄 Converting React Native to XML...');
    xml = convertRNToXML(code);
  } catch (error) {
    console.error(`❌ Conversion failed: ${(error as Error).message}`);
    process.exit(1);
  }
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'xml');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate output filename
  const inputBaseName = path.basename(inputFile, path.extname(inputFile));
  const outputFile = path.join(outputDir, `${inputBaseName}.xml`);
  
  // Write output file
  try {
    fs.writeFileSync(outputFile, xml, 'utf-8');
  } catch (error) {
    console.error(`❌ Error writing output file: ${(error as Error).message}`);
    process.exit(1);
  }
  
  // Success message
  console.log('✅ Conversion successful!');
  console.log(`📁 Output saved to: ${path.relative(process.cwd(), outputFile)}`);
}

// Run CLI
main();
