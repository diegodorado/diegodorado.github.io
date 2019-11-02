### Generate HTML

```
pandoc cv.es.md -f markdown -t html5 --template=cv \
-V margin-top=0 -V margin-left=0 -V margin-right=0 \
-V margin-bottom=0 -V pagetitle=dd -V papersize=A4 \
-o cv-diego-dorado.html
```

### Generate PDF

```
FONTCONFIG_FILE=/home/diegodorado/Code/node/diegodorado.github.io/content/cv/fonts.conf \
pandoc cv.es.md -t html5 --template=cv \
-V margin-top=0 -V margin-left=0 -V margin-right=0 \
-V margin-bottom=0 -V pagetitle=dd -V papersize=A4 \
-o cv-diego-dorado.pdf  
```
