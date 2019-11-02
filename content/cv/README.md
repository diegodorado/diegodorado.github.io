### Generate HTML

```
pandoc cv.md -f markdown -t html5 --template=cv \
-V margin-top=0 -V margin-left=0 -V margin-right=0 \
-V margin-bottom=0 -V pagetitle=dd -V papersize=A4 \
-o cv-diego-dorado.html
```

### Generate PDF

```
pandoc cv.md -t html5 --template=cv \
-V margin-top=0 -V margin-left=0 -V margin-right=0 \
-V margin-bottom=0 -V pagetitle=dd-V papersize=A4 \
-o cv-diego-dorado.pdf  
```
