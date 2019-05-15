index.txt is generated with:

rm index.txt && for f in *.dmp ;do echo $f>>index.txt; done;
