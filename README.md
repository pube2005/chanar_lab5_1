

\# Lab05 — API System Testing (Postman \& Newman)



\*\*Оюутны нэр:\*\* П.Пүрэвдаш  

\*\*Оюутны код:\*\* B232270144  

\*\*Хичээл:\*\* F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест  

\*\*Лаборатори:\*\* 05



\## 1. Зорилго



Лекц 5-ын тест дизайны таван алхмыг REST API дээр хэрэгжүүлж, Postman ашиглан бие даасан тест кейс боловсруулах, Newman ашиглан PASS, FAIL, DOWN нөхцөлийг автомат тестээр шалгах.



\## 2. Ажлын орчин



| Хэрэгсэл | Хувилбар |

|---|---|

| Үйлдлийн систем | Windows / PowerShell |

| Node.js | v24.14.1 |

| Newman | 6.2.2 |

| npm | 11.11.0 |

| Git | 2.52.0.windows.1 |

| Postman | API тестийн хэрэгсэл |



Командын гаралт:



```text

> node -v

v24.14.1



> newman -v

6.2.2

```



Collection variable:



| Variable | Value |

|---|---|

| baseUrl | http://localhost:3000 |



\## 3. Тест дизайны таван алхам



1\. Бие даан тестлэгдэх функцийг тодорхойлох.

2\. Оролтын сонголтуудыг тодорхойлох.

3\. Эквивалент анги болон төлөөлөх утгуудыг сонгох.

4\. Тестийн спецификаци боловсруулах.

5\. Бодит тест кейс хэрэгжүүлэх.



\### Тестлэгдэх функц



`POST /registrations`



Оюутны төлөв, хичээлийн хүчинтэй байдал болон урьдач нөхцөлийг шалгаж, хичээлд бүртгэнэ.



\### API endpoints



| Method | Endpoint | Зориулалт |

|---|---|---|

| PUT | /students/:id | Оюутны setup |

| PUT | /courses/:id | Хичээлийн setup |

| POST | /registrations | Хичээлд бүртгүүлэх |

| GET | /courses/:id | Хичээлийн мэдээлэл авах |

| GET | /registrations | Бүртгэлийн жагсаалт авах |



\## 4. Сонголт ба төлөөлөх утга



| Сонголт | Эквивалент анги | Төлөөлөх утга |

|---|---|---|

| studentID | Идэвхтэй оюутан | active |

| studentID | Идэвхгүй оюутан | inactive |

| studentID | Байхгүй оюутан | UNKNOWN\_STUDENT |

| coursesTaken | Урьдач нөхцөл хангана | \["CS201"] |

| coursesTaken | Урьдач нөхцөл хангахгүй | \["CS101"] |

| coursesTaken | Хоосон | \[] |

| courseID | Байгаа хичээл | CS313 |

| courseID | Байхгүй хичээл | UNKNOWN\_COURSE |

| prerequisites | Бүгдийг хангасан | CS201-ийг үзсэн |

| prerequisites | Заримыг хангасан | CS201, CS202-оос CS201-ийг үзсэн |

| prerequisites | Огт хангаагүй | Зөвхөн CS101-ийг үзсэн |

| prerequisites | Урьдач нөхцөлгүй | \[] |

| Хүсэлтийн формат | Талбар дутуу | studentID байхгүй |

| Хүсэлтийн формат | Буруу JSON | Invalid JSON |



\## 5. Тестийн спецификаци



| ID | Тестийн нөхцөл | HTTP status | Expected result |

|---|---|---:|---|

| TC01 | Амжилттай бүртгэл | 201 | OK |

| TC02 | Оюутан байхгүй | 200 | ERROR\_NO\_STUDENT |

| TC03 | Идэвхгүй оюутан | 200 | ERROR\_INACTIVE\_STUDENT |

| TC04 | Хичээл байхгүй | 200 | ERROR\_NO\_COURSE |

| TC05 | Урьдач нөхцөл хангаагүй | 200 | ERROR\_PREREQUISITES |

| TC06 | Оюутан болон хичээл байхгүй | 200 | ERROR\_NO\_STUDENT |

| TC07 | Идэвхгүй оюутан, хичээл байхгүй | 200 | ERROR\_INACTIVE\_STUDENT |

| TC08 | Урьдач нөхцөлгүй хичээл | 201 | OK |

| TC09 | Урьдач нөхцөлийг хэсэгчлэн хангасан | 200 | ERROR\_PREREQUISITES |

| TC10 | Үзсэн хичээлийн жагсаалт хоосон | 200 | ERROR\_PREREQUISITES |

| TC11 | studentID талбар дутуу | 400 | ERROR\_BAD\_REQUEST |

| TC12 | Буруу JSON | 400 | ERROR\_BAD\_JSON |



Нийт 12 тест кейс боловсруулсан.



\- Хэвийн нөхцөл: TC01.

\- Үндсэн алдааны нөхцөл: TC02–TC05.

\- Давхар алдааны нөхцөл: TC06–TC07.

\- Хязгаарын болон нэмэлт нөхцөл: TC08–TC12.



\## 6. Postman тестийн хэрэгжүүлэлт



Тест бүр өөрийн нөхцөлд шаардлагатай setup хүсэлт болон POST хүсэлттэй. Тестүүд ялгаатай ID ашигладаг тул бусад тестийн өгөгдлөөс хамаарахгүй.



Үндсэн хоёр oracle:



\- HTTP status шалгах.

\- Response-ийн result утгыг шалгах.



Амжилттай бүртгэлийн oracle-ийн жишээ:



```javascript

pm.test("Status code is 201", function () {

&#x20;   pm.response.to.have.status(201);

});



pm.test("Result is OK", function () {

&#x20;   pm.expect(pm.response.json().result).to.eql("OK");

});

```



registrationID-ийн тогтмол утгыг шалгаагүй, зөвхөн тоон төрөлтэй эсэхийг шалгасан. Урьдач нөхцөл хангаагүй үед missing массивыг нэмэлтээр шалгасан.



Collection: \[lab05-collection.json](lab05-collection.json)



\## 7. Newman автомат тест



\### Сервер ажиллуулах



```powershell

node server.js

```



\### 7.1. PASS



Сервер хэвийн ажиллаж байх үед үндсэн Collection-ийг ажиллуулсан.



```powershell

newman run lab05-collection.json

```



Үр дүн: 65 assertion бүгд амжилттай, exit code 0.



Нотолгоо: \[newman-pass.txt](results/newman-pass.txt)



\### 7.2. FAIL



Тусдаа fail collection үүсгэж, TC01 тестийн HTTP status oracle-ийг зориуд 201-ээс 200 болгон өөрчилсөн.



```powershell

newman run lab05-collection-fail.json

```



Бодит HTTP status 201 байсан тул нэг assertion амжилтгүй болж, exit code 1 гарсан. Үндсэн Collection-ийг өөрчлөөгүй.



Нотолгоо: \[newman-fail.txt](results/newman-fail.txt)



\### 7.3. DOWN



Серверийг Ctrl+C ашиглан унтрааж, үндсэн Collection-ийг дахин ажиллуулсан.



```powershell

newman run lab05-collection.json

```



Сервертэй холбогдох боломжгүй болсон тул ECONNREFUSED алдаа гарч, exit code 1 буцаасан.



FAIL нь бодит хариу oracle-ийн хүлээгдэх утгатай зөрсөн алдаа бол DOWN нь сервертэй холбогдох боломжгүй болсон интерфейсийн алдаа юм.



Нотолгоо: \[newman-down.txt](results/newman-down.txt)



\## 8. Туршилтын бодит үр дүн



| Үзүүлэлт | PASS | FAIL | DOWN |

|---|---:|---:|---:|

| Iterations | 1 | 1 | 1 |

| Requests | 30 | 30 | 30 |

| Failed requests | 0 | 0 | 30 |

| Test scripts | 30 | 30 | 30 |

| Assertions executed | 65 | 65 | 65 |

| Assertions passed | 65 | 64 | 0 |

| Assertions failed | 0 | 1 | 65 |

| Total duration | 2.6s | 2.7s | 2.7s |

| Exit code | 0 | 1 | 1 |



Үндсэн тест кейсийн тоо: \*\*12\*\*



Newman assertions executed: \*\*65\*\*



Гурван туршилтын бүрэн гаралтыг results хавтаст хадгалсан бөгөөд UTF-8 encoding хүчинтэй болохыг шалгасан.



\## 9. Нэмэлт даалгавар — Нийтийн API



Endpoint:



`GET https://jsonplaceholder.typicode.com/users`



Дараах гурван oracle-ийг хэрэгжүүлсэн.



\- HTTP status 200 эсэх.

\- Response массив мөн эсэх.

\- Эхний хэрэглэгчийн нэр Leanne Graham мөн эсэх.



| Үзүүлэлт | Үр дүн |

|---|---:|

| Requests | 1 |

| Assertions executed | 3 |

| Assertions passed | 3 |

| Assertions failed | 0 |

| Response time | 713ms |

| Exit code | 0 |



Нийтийн API нь GET-only бөгөөд setup шаардлагагүй тул өөрийн бүртгэлийн API-аас тест боловсруулахад хялбар байсан.



Collection: \[lab05-public-api.json](lab05-public-api.json)



Нотолгоо: \[newman-public-api.txt](results/newman-public-api.txt)



\## 10. AI туслахын хэрэглээ



AI-д өгсөн prompt:



> POST /registrations функцийн сонголтуудыг тодорхойлж, эквивалент ангид хуваан, ангиудын хослолоор Postman тестүүд санал болго.



AI туслахыг тестийн эквивалент анги тодорхойлох, давхар алдааны хослол боловсруулах болон oracle-ийн хүлээгдэх үр дүнг нягтлах зэрэг төвөгтэй хэсгүүдэд ашигласан. Нэмэлт AI шинжилгээгээр courseID талбар дутуу, хоосон ID болон давтан бүртгэл зэрэг өмнөх дизайнд тусгагдаагүй нөхцөлүүдийг тодорхойлсон. AI-ийн нэмэлт саналд хэсэгчлэн хангасан урьдач нөхцөл болон хоосон coursesTaken ангийг тусдаа тест болгон давтаагүй. Санал болгосон HTTP status болон result oracle-уудыг серверийн кодтой тулгаж нягталсан. AI-ийн нэмэлт тестүүдийг ажиллуулаагүй бөгөөд тайланд зөвхөн Postman болон Newman-ийн бодитоор ажиллуулсан тестийн үр дүнг ашигласан.



\## 11. Файлын бүтэц



```text

chanar\_lab5/

├── .gitignore

├── README.md

├── server.js

├── generate-collection.js

├── lab05-collection.json

├── lab05-collection-fail.json

├── lab05-public-api.json

└── results/

&#x20;   ├── newman-pass.txt

&#x20;   ├── newman-fail.txt

&#x20;   ├── newman-down.txt

&#x20;   └── newman-public-api.txt

```



Даалгавар бүрийн дараа Git commit хийж, ажлын явцыг үе шаттай баримтжуулсан.



\## 12. Дүгнэлт



Энэхүү лабораторийн ажлаар REST API системийн тестийг тест дизайны таван алхмын дагуу хэрэгжүүлсэн.

Эквивалент ангиудын хослолоор нийт 12 бие даасан тест кейс боловсруулсан.

Тестийн спецификаци боловсруулах алхам хамгийн их бодол шаардсан бөгөөд давхар алдааны хүлээгдэх үр дүнг зөв тодорхойлох хэрэгтэй байсан.

Оюутан байхгүй үед түүний төлөв болон үзсэн хичээлийг тодорхойлох боломжгүй тул ийм хослолыг утгагүй гэж үзсэн.

Тест бүр өөрийн setup болон oracle-тай учраас бусад тестээс хамаарахгүй ажиллах боломжтой болсон.

PASS туршилтаар 65 assertion бүгд амжилттай болж, exit code 0 гарсан.

FAIL туршилтаар зориуд оруулсан oracle-ийн алдааг Newman зөв илрүүлсэн.

DOWN туршилтаар серверийн холболтын алдааг илрүүлж, интерфейсийн болон oracle-ийн алдааны ялгааг тодорхойлсон.

Үндсэн тестүүдээр серверийн батлагдсан согог илрээгүй боловч давтан бүртгэл болон өгөгдлийн төрлийг нэмэлтээр шалгах боломжтой гэж үзсэн.

Postman болон Newman ашиглан API тестийг автоматжуулах, давтан ажиллуулах, үр дүнг баримтжуулах арга эзэмшсэн.



