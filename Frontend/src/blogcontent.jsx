import React from 'react'
import Blogcard from './BlogPage'
import Footer from './Footer';
import Navbar from './navbar';
import './blogcontent.css';

function Blogcontent() {
  return (
    <div>
        <Navbar/>
        <br/>
        <br/>
        <br/>
        <Blogcard
        title={"Red Rot in sugarcane"}
        image={"https://miwabora.go.ke/images/farming/details/sugarcane-red-rot.png"}
        description={"It can severely reduce the yield and quality of sugarcane, which is a crucial crop for sugar production, ethanol production, and other by-products in several tropical and subtropical regions around the world, including India.The disease occurs in a wide range of sugarcane varieties, affecting both young and mature plants, and it poses a serious threat to the sugar industry in countries like India, where sugarcane is a major crop.The symptoms of Red Rot are visible as a reddish-brown discoloration on the cane, which leads to internal rot and a significant loss of crop vigor."}
        remedy={"Use disease-resistant varieties and destroy affected canes immediately"}
        symptoms={"Wilting of Leaves: Infected plants show signs of premature yellowing and wilting of leaves.Softening of Stems: The internal tissue of the cane becomes soft and spongy, turning dark brown to reddish in color. In severe cases, this leads to complete stem collapse.Sugar Loss: Infected sugarcane can exhibit a significant reduction in sugar content, leading to low-quality cane that is unsuitable for processing into sugar."}
        weather={"Red Rot thrives in humid conditions, especially during the monsoon season, as the high moisture levels favor the growth and spread of the pathogen.Warm temperatures between 20°C and 30°C are also ideal for disease development.Extended periods of high rainfall, combined with poor field drainage, create a perfect environment for fungal infections."}
        soil={"Poor soil drainage and over-irrigation can contribute to increased soil moisture, which facilitates the spread of Red Rot.Additionally, soils that are deficient in certain nutrients may weaken plant defenses, making them more susceptible to infection.Acidic soils and soils that lack proper aeration can also exacerbate the conditions under which Colletotrichum falcatum thrives."}
       
        />     

        <Blogcard
  title={"Yellow Leaf Disease in Sugarcane"}
  image={"https://pestsdiseases.com/wp-content/uploads/Yellow-Leaf-Disease-Management-in-Sugarcane-2.jpg"}
  description={"Yellow Leaf Disease is a viral disease caused by the Sugarcane yellow leaf virus (SCYLV). It affects the phloem tissue of the plant and leads to reduced sugar accumulation and overall yield loss. It's a significant threat to sugarcane production in tropical and subtropical regions, especially in areas with high aphid activity, which spreads the virus."}
  remedy={"Use virus-free planting material and control aphid populations through integrated pest management (IPM). Remove and destroy infected plants to limit spread."}
  symptoms={"Yellowing of Leaf Midrib: Initially, the midrib of the topmost leaves starts turning yellow, which then spreads to the entire leaf.Loss of Vigor: Plants become stunted and exhibit slow growth.Sugar Reduction: Infected plants show a decrease in juice quality and sugar content."}
  weather={"Warm, humid conditions favor the proliferation of aphid vectors, especially in late summer and monsoon seasons, which accelerates disease spread."}
  soil={"Although not directly soil-borne, poor soil nutrition can exacerbate symptoms. Well-balanced fertilization enhances plant resilience. Avoid excess nitrogen as it promotes lush growth favorable to aphid infestation."}
/>

<Blogcard
  title={"Rust Disease in Sugarcane"}
  image={"https://agritech.tnau.ac.in/crop_protection/images/sugarcane_diseases/3.2.jpg"}
  description={"Rust is a fungal disease caused primarily by Puccinia melanocephala (brown rust). It affects sugarcane leaves, leading to decreased photosynthesis, stunted growth, and reduced cane yield and quality. It is a common disease in many sugarcane-growing regions and can rapidly spread under favorable conditions."}
  remedy={"Cultivate resistant varieties, apply fungicides as needed, and ensure good field sanitation by removing infected leaf material."}
  symptoms={"Reddish-Brown Pustules: Small, elongated rust pustules appear on the underside of leaves, often surrounded by yellow halos.Leaf Drying: Infected leaves dry prematurely, reducing the plant’s ability to photosynthesize.Plant Weakness: Infected canes may become weak, reducing tonnage and juice quality."}
  weather={"Rust thrives in warm and moist environments, especially during the rainy season. Temperatures between 20°C and 30°C and high humidity encourage rapid spore production and spread."}
  soil={"Soils with poor drainage or excessive nitrogen levels may promote leaf growth that is more susceptible to infection. Balanced nutrition and proper spacing improve air circulation and reduce disease severity."}
/>

   
        <Footer/>
    </div>
  )
}

export default Blogcontent;