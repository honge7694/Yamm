// API Request (GET) : email, date
// API Response (GET) : food_img, food, date

export default function dummy(req, res) {
    res.status(200).json([
        {
            "date" : '2022-02-25 12:11:11',
            "img" : '/asset/돈까스.png',
            "img_id" : '20220225',
            "name" : 'EEYORE1',
            "memo" : '돈까스 돈까스 돈까스 돈까스 돈까스 돈까스 돈까스',
        },
        {
            "date" : '2022-02-25 12:12:11',
            "img" : '/asset/비빔밥.png',
            "img_id" : '30220225',
            "name" : 'EEYORE1',
            "memo" : '비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 비빔밥 ',
        },
        {
            "date" : '2022-02-25 12:13:11',
            "img" : '/asset/삼겹살.png',
            "img_id" : '40220225',
            "name" : 'EEYORE1',
            "memo" : '삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 삼겹살 ',
        },
        {
            "date" : '2022-02-25 19:11:11',
            "img" : '/asset/떡볶이.png',
            "img_id" : '50220225',
            "name" : 'EEYORE1',
            "memo" : '떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 떡볶이 ',
        },
    ]);
  }
  
  