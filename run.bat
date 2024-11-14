@echo off

:: Open the first terminal, change directory, and run 'yarn dev'
start cmd /k "cd /d C:\Users\nares\Coding-Line\Company\DonatedSociety\frontent-v2  && yarn dev"

:: Open the second terminal, change directory, and run 'yarn dev'
start cmd /k "cd /d C:\Users\nares\Coding-Line\Company\DonatedSociety\frontent-v2 && npx prisma studio"
