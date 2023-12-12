import { Response } from "express";
import fs from "fs";

export class Helpers {
  private constructor() {}

  static handleServerError(response: Response): void {
    response.status(500).json({ message: "Something went wrong." });
  }

  static saveBase64File(
    base64String: string,
    folderPath: string,
    fileName: string
  ): void {
    // Remove the data:image/png;base64 part
    const base64Data = base64String.replace(
      /^data:[a-zA-Z0-9\/+]+;base64,/,
      ""
    );

    // Create a buffer from the base64 string
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Save the buffer to a file
    const filePath = `${folderPath}/${fileName}`;
    fs.writeFileSync(filePath, buffer);
  }
}
