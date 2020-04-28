import { uploadFile } from "../../aws/upload";

export default {
  Mutation: {
    singleUploadStream: async (parent, args) => {
      const file = await args.file;
      const { createReadStream, filename, mimetype } = file;
      const fileStream = createReadStream();
      return await uploadFile(fileStream, filename);
    }
  }
};
