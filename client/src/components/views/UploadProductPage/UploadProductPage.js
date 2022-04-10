import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd'; // antd의 도움으로 디자인!
import FileUpload from '../../utils/FileUpload'; //파일 업로드

const { Title } = Typography;
const { TextArea } = Input;

//대륙 이름 다 정의
const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]


function UploadProductPage() {

    // 이름
    const [Title, setTitle] = useState("") //useState는 react 라이브러리에서 가져와야함
    // 설명
    const [Description, setDescription] = useState("") 
    // 가격
    const [Price, setPrice] = useState(0)  //0부터 시작
    // 국가
    const [Continent, setcontinent] = useState(1)  
    // 이미지
    const [Images, setImages] = useState([]) // array로 줌  

    const titleChangeHandler = (event) => { //function을 만들어줌
        //타이핑할 때마다 event를 가져와서 function 작동
        setTitle(event.currentTarget.value) //setTitle로 event 일어날 때마다 title state를 바꿔줌
    }
    const descriptionChangeHandler = (event) => { //function descriptionChangeHandler
        setDescription(event.currentTarget.value) //setDescription로 event 일어날 때마다 Description state를 바꿔줌
    }
    const priceChangeHandler = (event) => { //function priceChangeHandler
        setPrice(event.currentTarget.value) 
    }
    const continentChangeHandler = (event) => { //function priceChangeHandler
        setcontinent(event.currentTarget.value) 
    }

 return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>여행 상품 업로드</h2> 
        </div>

        <Form>

            <FileUpload />
            
            <br />
            <br />
            <label>이름</label>
            <Input onChange={titleChangeHandler} value={Title} //onchange 일으킬 때 value가 변하게 해줘야함
             /> 
            <br />
            <br />
            <label>설명</label>
            <TextArea onChange={descriptionChangeHandler} value={Description}/>
            <br />
            <br />
            <label>가격($)</label>
            <Input type="number" 
            //input 의 onchange는 키보드를 타이핑할 때 value를 바뀌게 해주는 거
            onChange={priceChangeHandler} value={Price}/>
            <br />
            <br />
            <select onChange= // select의 onchange는 옵션이 변화될 때 옵션의 value를 바뀌게 해주는 거
            {continentChangeHandler} value={Continent}>
                {Continents.map(item => (
                //map이란 메소드 => key 하나하나 설정 가능
                // item에 Continents key 중 하나가 들어있는 거
                <option key={item.key} value={item.key}> {item.value}</option>
                ))} 
                
            </select>
            <br />
            <br />
            <Button>
                확인
            </Button>
        </Form>
    </div>
  )
}

export default UploadProductPage
