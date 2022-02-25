// API Request (GET) : email, date
// API Response (GET) : food_img, food, date

export default function dummy(req, res) {
    res.status(200).json({
        food_img : '/vercel.svg',
        food : '돈까스',
        date : '20220225'   
    });
  }
  
  