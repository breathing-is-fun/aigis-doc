#!/bin/bash

PROJECT=$1
shift
SOURCES=$@
DESTINATIONS=""
DELIMITER=""

for src in $SOURCES
do
    DELIMITER=" --files "
    DESTINATIONS="$DESTINATIONS$DELIMITER${src}"
done

ng lint $PROJECT $DESTINATIONS
