import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const Name = formData.get('Name');
    const Email = formData.get('Email');       // changed
    const Location = formData.get('Location'); // changed
    const Message = formData.get('Message');   // changed

    if (!Name || !Email || !Location || !Message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // TODO: Save product and image to database / cloud storage
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: 'Message failed' },
      { status: 500 }
    );
  }
}

