import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get all fields from the form
    const productName = formData.get('productName')?.toString() || '';
    const quantity = formData.get('quantity')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const image = formData.get('image'); // this is a File object

    // Validate required fields
    if (!productName || !quantity || !price || !image) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Optional: convert quantity and price to numbers
    const quantityNum = Number(quantity);
    const priceNum = Number(price);
    if (isNaN(quantityNum) || isNaN(priceNum)) {
      return NextResponse.json(
        { success: false, message: 'Quantity and price must be numbers' },
        { status: 400 }
      );
    }

    // TODO: Save the product to your database
    // TODO: Upload the image to cloud storage (e.g., AWS S3, Cloudinary)

    // Example: You could save the file locally (for testing only)
    // const arrayBuffer = await image.arrayBuffer();
    // await fs.promises.writeFile(`./uploads/${image.name}`, Buffer.from(arrayBuffer));

    return NextResponse.json({
      success: true,
      message: 'Product uploaded successfully',
      product: {
        productName,
        quantity: quantityNum,
        price: priceNum,
        description,
        imageName: (image as File).name
      }
    });
  } catch (err) {
    console.error('Upload API error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
