export default function Home({images}) {
  
  console.log(images)

  return (
    <div className="">
      <div className="bg-main">Header</div>
      <h1>사진 업로드</h1>
        <div>Camera</div>
      <h1>오늘 먹은 음식</h1>
        <div className="grid gap-4 grid-cols-4">
          {images.map(image => (
            <div key={image.id}>
              <img src={image.url}></img>
            </div>
          ))}
        </div>
      <h1>식단 분석표</h1>
    </div>
  )
}

export const getServerSideProps = async() => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=4`)
  const images = await res.json();

  return {
    props: {
      images
    }
  }
}
