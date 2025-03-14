import React from 'react'

function Blogcard({title,image,description,remedy,symptoms,weather,soil,conclusion}) {

  return (
    <div className="blog-card">
    <img src={image} alt={title} />
    <div className="blog-content">
      <h2 >{title}</h2>

      <p><strong>Description:</strong> {description}</p>
      <br/>
    
      <p><strong>Remedy:</strong> {remedy}</p>
      <br/>
    
      <p><strong>Symptoms of red rot disease:<br/></strong>{symptoms}</p>
      <br/>
      
      <p><strong>Weather Conditions:
        <br />
        </strong>{weather}</p>
        <br/>
    <p><strong>Soil Conditions:<br/></strong>{soil}</p>
    </div>
    <br/>
      
      

  </div>
  )
}
export default Blogcard;







// function Blogcard()
// function BlogPage() {
//     const data=[
//         {
//             title: "Red Rot in Sugarcane",
//             image: "https://krishijagran.com/media/67802/red-rot.jpg",
//             description: "Red Rot causes the internal tissues of the sugarcane to redden and rot.",
//             remedy: "Use disease-resistant varieties and destroy affected canes immediately."
//           },
//           {
//             title: "Yellow Leaf Disease",
//             image: "https://www.sugarcanecrops.com/wp-content/uploads/2022/08/Sugarcane-yellow-leaf-disease.jpg",
//             description: "Leaves turn yellow due to phytoplasma infection reducing yield.",
//             remedy: "Control with insecticides and remove affected plants."
//           },
//           {
//             title: "Sugarcane Rust",
//             image: "https://www.researchgate.net/profile/Jose-Coombe/publication/343741324/figure/fig1/AS:926751254552576@1597820733904/Sugarcane-rust-on-leaves.ppm",
//             description: "Brown-orange rust pustules appear on leaves affecting photosynthesis.",
//             remedy: "Apply appropriate fungicides and maintain field hygiene."
//           }
// ];
//   return (
//     <div>

//     </div>
//   )
// }

// export default BlogPage