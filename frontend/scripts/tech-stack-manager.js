#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Tech Stack Manager
 * Quick script to list current tech stack and validate SVG files
 * 
 * Usage:
 *   node scripts/tech-stack-manager.js list    - List all technologies
 *   node scripts/tech-stack-manager.js check   - Validate SVG files exist
 *   node scripts/tech-stack-manager.js count   - Count technologies
 */

const fs = require('fs');
const path = require('path');

// Paths
const CONTENT_PATH = path.join(__dirname, '../data/content.ts');
const TECH_DIR = path.join(__dirname, '../public/assets/tech');

// Extract techStack array from content.ts
function getTechStack() {
    const content = fs.readFileSync(CONTENT_PATH, 'utf-8');
    const match = content.match(/export const techStack = \[([\s\S]*?)\]/);

    if (!match) {
        console.error('❌ Could not find techStack in content.ts');
        process.exit(1);
    }

    const techStackStr = match[1];
    const entries = techStackStr.match(/{\s*name:\s*"([^"]+)",\s*icon:\s*"([^"]+)"\s*}/g);

    return entries.map(entry => {
        const [, name, icon] = entry.match(/name:\s*"([^"]+)",\s*icon:\s*"([^"]+)"/);
        return { name, icon };
    });
}

// List all technologies
function listTechnologies() {
    const techStack = getTechStack();

    console.log('\n📋 Current Tech Stack:\n');
    techStack.forEach((tech, index) => {
        console.log(`${(index + 1).toString().padStart(2)}. ${tech.name.padEnd(15)} → ${tech.icon}`);
    });
    console.log(`\n✅ Total: ${techStack.length} technologies\n`);
}

// Check if SVG files exist
function checkFiles() {
    const techStack = getTechStack();
    let missing = [];
    let found = [];

    console.log('\n🔍 Validating SVG files...\n');

    techStack.forEach(tech => {
        const svgPath = path.join(TECH_DIR, tech.icon);
        const exists = fs.existsSync(svgPath);

        if (exists) {
            const stats = fs.statSync(svgPath);
            const size = (stats.size / 1024).toFixed(2);
            found.push({ ...tech, size });
            console.log(`✅ ${tech.name.padEnd(15)} ${tech.icon.padEnd(20)} (${size} KB)`);
        } else {
            missing.push(tech);
            console.log(`❌ ${tech.name.padEnd(15)} ${tech.icon.padEnd(20)} MISSING`);
        }
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Found: ${found.length}`);
    console.log(`   Missing: ${missing.length}`);

    if (missing.length > 0) {
        console.log(`\n⚠️  Missing files:`);
        missing.forEach(tech => {
            console.log(`   - ${tech.icon} (for ${tech.name})`);
        });
        console.log(`\n💡 Download icons from: https://simpleicons.org/`);
    } else {
        console.log(`\n🎉 All SVG files present!\n`);
    }
}

// Count technologies
function countTechnologies() {
    const techStack = getTechStack();
    console.log(`\n📊 Total Technologies: ${techStack.length}\n`);
}

// Main
const command = process.argv[2];

switch (command) {
    case 'list':
        listTechnologies();
        break;
    case 'check':
        checkFiles();
        break;
    case 'count':
        countTechnologies();
        break;
    default:
        console.log(`
🛠️  Tech Stack Manager

Usage:
  node scripts/tech-stack-manager.js list    - List all technologies
  node scripts/tech-stack-manager.js check   - Validate SVG files exist
  node scripts/tech-stack-manager.js count   - Count technologies

Examples:
  node scripts/tech-stack-manager.js list
  node scripts/tech-stack-manager.js check
    `);
}
