interface PageProps {
    params: Promise<{ videoId: string }>;
}

const Page =  async ({ params }: PageProps) => {
    // debug
    console.log("Server component")

    const { videoId } = await params;

    return (
        <div>
            Video Id: {videoId}
        </div>
    );
}

export default Page;