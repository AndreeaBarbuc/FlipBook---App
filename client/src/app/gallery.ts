//Gallary table/ collection model for uploading image and description/text for image in DB dynamically

export class Gallery {
    _id!: string;
    imageUrl!: string;
    imageDesc!: string;
    uploaded!: Date;
  }