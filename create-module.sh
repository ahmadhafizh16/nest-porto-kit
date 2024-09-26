#!/bin/sh

echo "Enter module name: "
read folder
if [ -z "$folder" ]; then
  echo "Invalid name"
  return 0
fi
echo "********************************"
echo "Generating Template Folder for ${folder} Module"
echo "********************************"
mkdir "./src/app/${folder}"
mkdir "./src/app/${folder}/Request"
cp "./stub/RequestTemplate" "./src/app/${folder}/Request/basic.request.ts"

mkdir "./src/app/${folder}/Transformer"
cp "./stub/TransformerTemplate" "./src/app/${folder}/Transformer/basic.transformer.ts"

mkdir "./src/app/${folder}/Action"
cp "./stub/ActionTemplate"  "./src/app/${folder}/Action/basic.action.ts"

mkdir "./src/app/${folder}/Task"
cp "./stub/TaskTemplate" "./src/app/${folder}/Task/basic.task.ts"

lcf=$(echo "$folder" |  tr '[:upper:]' '[:lower:]' )

cp "./stub/ControllerTemplate" "./src/app/${folder}/${lcf}.controller.ts"
cp "./stub/ModuleTemplate" "./src/app/${folder}/${lcf}.module.ts"
cp "./stub/ServiceTemplate" "./src/app/${folder}/${lcf}.service.ts"