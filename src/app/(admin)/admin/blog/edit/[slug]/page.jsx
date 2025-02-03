

const page = async ({params}) => {
    const slug = (await params).slug
    console.log(slug)
    return (
        <div className="space-y-4">{slug}</div>
    )
}

export default page