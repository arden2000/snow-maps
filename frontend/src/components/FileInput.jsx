import React from "react";

import {
  Box,
  Button,
  FileInput as GrommetFileInput,
  Form,
  FormField,
} from "grommet";

import { uploadImage } from "../aws-funcs.js";

function FileInput({directory}) {
  const selectedFiles = [];

  const uploadFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      uploadImage(directory, files[i]);
    }
  };

  return (
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <Form validate="submit" onSubmit={(event) => {uploadFiles(event.value.fileInput); event.value.fileInput = []}}>
          <FormField name="fileInput" htmlFor="fileInput" required>
            <GrommetFileInput
              name="fileInput"
              id="fileInput"
              multiple={{
                max: 5,
              }}
              onChange={(event, { files }) => {
                console.log(event);
                console.log(event.target.files);
                for (let i = 0; i < files.length; i += 1) {
                  const file = files[i];
                  console.log(file);
                }
              }}
            />
          </FormField>
          <Button label="Submit" primary type="submit" />
        </Form>
      </Box>
    </Box>
  );
}

export default FileInput;
