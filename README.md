

\# Lab05 — API System Testing (Postman \& Newman)



\*\*Оюутны нэр:\*\* П.Пүрэвдаш  

\*\*Оюутны код:\*\* B232270144  

\*\*Хичээл:\*\* F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест  

\*\*Лаборатори:\*\* 05



\## 1. Зорилго



Лекц 5-ын тест дизайны таван алхмыг REST API дээр хэрэгжүүлж, Postman ашиглан бие даасан тестийн багц боловсруулах, Newman ашиглан автомат тест ажиллуулах, PASS, FAIL, DOWN нөхцөлийг баталгаажуулах.



\## 2. Ажлын орчин



| Хэрэгсэл | Хувилбар |

|---|---|

| Үйлдлийн систем | Windows / PowerShell |

| Node.js | v24.14.1 |

| npm | 11.11.0 |

| Newman | 6.2.2 |

| Git | 2.52.0.windows.1 |

| API | Node.js HTTP server |

| Base URL | http://localhost:3000 |



Командын бодит гаралт:



```text

> node -v

v24.14.1



> newman -v

6.2.2

```



Postman Collection variable:



| Variable | Value |

|---|---|

| baseUrl | http://localhost:3000 |



\## 3. Бие даан тестлэгдэх функц



`POST /registrations`



Оюутны төлөв, хичээлийн хүчинтэй байдал болон урьдач нөхцөлийг шалгаж, хичээлд бүртгэх функц.



\### API endpoints



| Method | Endpoint | Зориулалт |

|---|---|---|

| PUT | /students/:id | Оюутны мэдээлэл бэлтгэх |

| PUT | /courses/:id | Хичээлийн мэдээлэл бэлтгэх |

| POST | /registrations | Хичээлд бүртгүүлэх |

| GET | /courses/:id | Хичээлийн мэдээлэл авах |

| GET | /registrations | Бүртгэлийн жагсаалт авах |



\## 4. Сонголт ба төлөөлөх утгын хүснэгт



| Сонголт | Эквивалент анги | Төлөөлөх утга |

|---|---|---|

| Оюутны төлөв | Идэвхтэй | active |

| Оюутны төлөв | Идэвхгүй | inactive |

| Оюутны хүчинтэй байдал | Байхгүй | UNKNOWN\_STUDENT |

| Үзсэн хичээл | Урьдач нөхцөл хангана | \["CS201"] |

| Үзсэн хичээл | Урьдач нөхцөл хангахгүй | \["CS101"] |

| Үзсэн хичээл | Хоосон | \[] |

| Хичээлийн хүчинтэй байдал | Байгаа | CS313 |

| Хичээлийн хүчинтэй байдал | Байхгүй | UNKNOWN\_COURSE |

| Урьдач нөхцөлийн хангалт | Бүгдийг үзсэн | CS201 |

| Урьдач нөхцөлийн хангалт | Заримыг үзсэн | CS201, CS202-оос зөвхөн CS201 |

| Урьдач нөхцөлийн хангалт | Огт үзээгүй | CS101 |

| Урьдач нөхцөл | Шаардлагагүй | \[] |

| Хүсэлтийн формат | Талбар дутуу | studentID байхгүй |

| Хүсэлтийн формат | Буруу JSON | Invalid JSON |



\## 5. Тестийн спецификаци



| ID | Тестийн нөхцөл | Expected HTTP status | Expected result |

|---|---|---:|---|

| TC01 | Амжилттай бүртгэл | 201 | OK |

| TC02 | Оюутан байхгүй | 200 | ERROR\_NO\_STUDENT |

| TC03 | Идэвхгүй оюутан | 200 | ERROR\_INACTIVE\_STUDENT |

| TC04 | Хичээл байхгүй | 200 | ERROR\_NO\_COURSE |

| TC05 | Урьдач нөхцөл хангаагүй | 200 | ERROR\_PREREQUISITES |

| TC06 | Оюутан болон хичээл байхгүй | 200 | ERROR\_NO\_STUDENT |

| TC07 | Идэвхгүй оюутан, хичээл байхгүй | 200 | ERROR\_INACTIVE\_STUDENT |

| TC08 | Урьдач нөхцөлгүй хичээл | 201 | OK |

| TC09 | Зарим урьдач нөхцөлийг хангасан | 200 | ERROR\_PREREQUISITES |

| TC10 | Үзсэн хичээлийн жагсаалт хоосон | 200 | ERROR\_PREREQUISITES |

| TC11 | studentID талбар дутуу | 400 | ERROR\_BAD\_REQUEST |

| TC12 | Буруу JSON | 400 | ERROR\_BAD\_JSON |



\## 6. Тест дизайны стратеги



\- Happy path: TC01.

\- Алдааны дөрвөн үндсэн анги: TC02–TC05.

\- Давхар алдааны хослол: TC06, TC07.

\- Хязгаарын болон нэмэлт тохиолдол: TC08–TC12.

\- Тест бүр өөрийн нөхцөлд шаардлагатай setup хүсэлттэй.

\- Тест бүр ялгаатай оюутан болон хичээлийн ID ашиглана.

\- HTTP status болон result утгыг oracle ашиглан шалгана.

\- Амжилттай бүртгэлийн registrationID-ийн тогтмол утгыг шалгахгүй, зөвхөн тоон төрөлтэй эсэхийг шалгана.

\- Урьдач нөхцөл хангаагүй үед missing массивыг нэмэлтээр шалгана.

\- Давхар алдааны хүлээгдэх үр дүнг серверийн шалгалтын дарааллаас тодорхойлж, API тестээр баталгаажуулсан.



\## 7. Postman тестийн хэрэгжүүлэлт



Нийт 12 бие даасан тест кейсийг `lab05-collection.json` файлд хэрэгжүүлсэн.



Тест бүр шаардлагатай setup PUT хүсэлт, POST хүсэлт болон HTTP status, result oracle-уудтай.



Амжилттай бүртгэлийн oracle-ийн жишээ:



```javascript

pm.test("Status code is 201", function () {

&#x20;   pm.response.to.have.status(201);

});



pm.test("Result is OK", function () {

&#x20;   pm.expect(pm.response.json().result).to.eql("OK");

});

```



Үндсэн Collection:



\- Test cases: 12

\- HTTP requests: 30

\- Assertions executed: 65

\- Assertions passed: 65

\- Assertions failed: 0



\## 8. Newman автомат тест



\### 8.1. Сервер ажиллуулах



```powershell

node server.js

```



\### 8.2. PASS туршилт



Сервер хэвийн ажиллаж байх үед үндсэн Collection-ийг ажиллуулсан.



```powershell

cmd.exe /c "newman run lab05-collection.json --color off --disable-unicode > results\\newman-pass.txt 2>\&1"

$passExit = $LASTEXITCODE

Add-Content results/newman-pass.txt "exit=$passExit"

```



Үр дүн:



\- Requests: 30

\- Assertions: 65

\- Failed assertions: 0

\- Exit code: 0



Нотолгоо: \[newman-pass.txt](results/newman-pass.txt)



\### 8.3. FAIL туршилт



TC01 тестийн HTTP status oracle-ийг зориуд 201 биш 200 гэж хүлээдэг болгож, тусдаа `lab05-collection-fail.json` файл үүсгэсэн.



```powershell

cmd.exe /c "newman run lab05-collection-fail.json --color off --disable-unicode > results\\newman-fail.txt 2>\&1"

$failExit = $LASTEXITCODE

Add-Content results/newman-fail.txt "exit=$failExit"

```



Үр дүн:



\- Requests: 30

\- Assertions: 65

\- Passed assertions: 64

\- Failed assertions: 1

\- Expected HTTP status: 200

\- Actual HTTP status: 201

\- Exit code: 1



Newman буруу oracle-ийг илрүүлж, 1 exit code буцаасан нь CI quality gate-ийн зарчмыг баталгаажуулсан.



Үндсэн Collection-ийг өөрчлөөгүй.



Нотолгоо: \[newman-fail.txt](results/newman-fail.txt)



\### 8.4. DOWN туршилт



Серверийг Ctrl+C ашиглан унтрааж, TCP холболт үүсэхгүй байгааг шалгасан.



```powershell

Test-NetConnection localhost -Port 3000

```



Үр дүн:



```text

TcpTestSucceeded : False

```



Сервер унтарсан үед үндсэн Collection-ийг дахин ажиллуулсан.



```powershell

cmd.exe /c "newman run lab05-collection.json --color off --disable-unicode > results\\newman-down.txt 2>\&1"

$downExit = $LASTEXITCODE

Add-Content results/newman-down.txt "exit=$downExit"

```



Үр дүн:



\- Requests: 30

\- Failed requests: 30

\- Assertions: 65

\- Failed assertions: 65

\- Exit code: 1



Холболтын алдаа:



```text

connect ECONNREFUSED 127.0.0.1:3000

```



FAIL нь серверийн бодит хариу oracle-ийн хүлээгдэх утгатай зөрсөн алдаа бол DOWN нь сервертэй холбогдох боломжгүй болсон интерфейсийн алдаа юм.



DOWN үед хариу ирээгүйгээс assertion болон JSON шалгалтууд мөн амжилтгүй болсон.



Нотолгоо: \[newman-down.txt](results/newman-down.txt)



\## 9. Туршилтын нэгдсэн үр дүн



| Үзүүлэлт | PASS | FAIL | DOWN |

|---|---:|---:|---:|

| Iterations | 1 | 1 | 1 |

| Requests | 30 | 30 | 30 |

| Failed requests | 0 | 0 | 30 |

| Test scripts | 30 | 30 | 30 |

| Assertions executed | 65 | 65 | 65 |

| Assertions passed | 65 | 64 | 0 |

| Assertions failed | 0 | 1 | 65 |

| Total run duration | 2.6s | 2.7s | 2.7s |

| Exit code | 0 | 1 | 1 |



Үндсэн PASS туршилтын 65 assertion бүгд амжилттай болсон.



Гурван туршилтын бүрэн текст гаралтыг results хавтаст хадгалсан бөгөөд UTF-8 encoding хүчинтэй болохыг PowerShell ашиглан шалгасан.



\## 10. Нэмэлт даалгавар — Нийтийн API



JSONPlaceholder нийтийн API дээр GET хүсэлт илгээж тест хийсэн.



Endpoint:



```text

GET https://jsonplaceholder.typicode.com/users

```



Oracle:



```javascript

pm.test("Status code is 200", function () {

&#x20;   pm.response.to.have.status(200);

});



pm.test("Response is an array", function () {

&#x20;   pm.expect(pm.response.json()).to.be.an("array");

});



pm.test("First user name is Leanne Graham", function () {

&#x20;   pm.expect(pm.response.json()\[0].name).to.eql("Leanne Graham");

});

```



Newman ажиллуулах:



```powershell

cmd.exe /c "newman run lab05-public-api.json --color off --disable-unicode > results\\newman-public-api.txt 2>\&1"

$publicExit = $LASTEXITCODE

Add-Content results/newman-public-api.txt "exit=$publicExit"

```



\### Бодит үр дүн



| Үзүүлэлт | Үр дүн |

|---|---:|

| HTTP status | 200 |

| Requests | 1 |

| Assertions | 3 |

| Passed assertions | 3 |

| Failed assertions | 0 |

| Response time | 713ms |

| Total run duration | 806ms |

| Exit code | 0 |



Нийтийн API нь GET-only бөгөөд setup шаардлагагүй тул өөрийн бүртгэлийн API-аас тест боловсруулахад хялбар байсан боловч гадаад сервер болон интернет холболтоос хамааралтай.



Нотолгоо: \[newman-public-api.txt](results/newman-public-api.txt)



Нийтийн API-ийн 3 assertion нь үндсэн Collection-ийн 65 assertion-д ороогүй.



\## 11. Нэмэлт даалгавар — AI шинжилгээ



\### AI-д өгсөн prompt



> Энэ API-гийн POST /registrations функцийн сонголтуудыг тодорхойлж, сонголт бүрийг эквивалент ангид хуваагаад, ангиудын хослолоор Postman тестүүд үүсгэ. Лекц 5-ын тест дизайны таван алхмыг баримталж, setup, HTTP status болон result oracle-уудыг тодорхойл.



\### AI-ийн санал болгосон нэмэлт тестүүд



| ID | Тестийн нөхцөл | Expected HTTP | Expected result |

|---|---|---:|---|

| AI01 | courseID талбар дутуу | 400 | ERROR\_BAD\_REQUEST |

| AI02 | Хоёр ID хоёулаа дутуу | 400 | ERROR\_BAD\_REQUEST |

| AI03 | studentID хоосон | 400 | ERROR\_BAD\_REQUEST |

| AI04 | courseID хоосон | 400 | ERROR\_BAD\_REQUEST |

| AI05 | Олон урьдач нөхцөлийг бүгдийг хангасан | 201 | OK |

| AI06 | Ижил хичээлд давтан бүртгүүлэх | 201 | OK |

| AI07 | Оюутны төлөв pending | 200 | ERROR\_INACTIVE\_STUDENT |

| AI08 | Оюутан байхгүй, courseID дутуу | 400 | ERROR\_BAD\_REQUEST |



\### AI шинжилгээний дүгнэлт



AI туслахад server.js кодыг өгч, Лекц 5-ын тест дизайны таван алхмын дагуу шинжилгээ хийлгэсэн. AI-ийн тодорхойлсон үндсэн эквивалент ангиуд өмнөх 12 тестийн дизайнтай нийцэж байсан. AI нь courseID талбар дутуу, хоосон ID, давтан бүртгэл болон буруу өгөгдлийн төрөл зэрэг нэмэлт тохиолдлуудыг санал болгосон. AI нь хэсэгчлэн хангасан болон хоосон coursesTaken ангийг тодорхойлсон боловч нэмэлт найман спецификацид тусдаа тест болгон оруулаагүй. AI-ийн санал болгосон HTTP status болон result oracle-ууд серверийн кодын логиктой нийцэж байсан. Давтан бүртгэл болон өгөгдлийн төрлийн баталгаажуулалттай холбоотой боломжит асуудлуудыг илрүүлсэн боловч бодит тестээр баталгаажуулаагүй. AI туслах нь тестийн хамрах хүрээг өргөжүүлэхэд ашигтай боловч санал болгосон үр дүнг код болон бодит туршилтаар нягтлах шаардлагатай.



AI-ийн нэмэлт найман спецификацийг Newman дээр ажиллуулаагүй бөгөөд үндсэн тестийн статистикт оруулаагүй.



\## 12. Репозиторийн үндсэн файлууд



| Файл | Зориулалт |

|---|---|

| server.js | Тестлэх REST API сервер |

| generate-collection.js | Үндсэн Collection үүсгэх скрипт |

| lab05-collection.json | Үндсэн 12 тест кейс |

| lab05-collection-fail.json | Зориуд буруу oracle бүхий Collection |

| lab05-public-api.json | Нийтийн API тест |

| results/newman-pass.txt | PASS нотолгоо |

| results/newman-fail.txt | FAIL нотолгоо |

| results/newman-down.txt | DOWN нотолгоо |

| results/newman-public-api.txt | Нийтийн API нотолгоо |

| README.md | Лабораторийн тайлан |

| .gitignore | Git-д оруулахгүй файлын тохиргоо |



\## 13. Git commit-ийн түүх



| Commit | Хугацаа (2026-11-25) | Гүйцэтгэсэн ажил |

|---|---|---|

| 8af30e4 | 15:48:26 | API сервер болон ажлын орчин |

| 9a0b62c | 16:08:33 | Анхны API тест, хоёр oracle |

| 667d2a1 | 16:18:15 | Эквивалент анги, 12 спецификаци |

| a54fad1 | 16:24:29 | 12 бие даасан тест, 65 assertion |

| fbbca6d | 16:34:28 | PASS, FAIL, DOWN нотолгоо |

| 5c8c4ba | 17:14:14 | Нийтийн API тест |



Даалгавар бүрийн дараа Git commit хийж, ажлын явцыг үе шаттай баримтжуулсан.



\## 14. Дүгнэлт



Энэхүү лабораторийн ажлаар REST API системийн тестийг Лекц 5-ын тест дизайны таван алхмын дагуу хэрэгжүүлсэн. Сонголтуудыг эквивалент ангид хувааж, тэдгээрийн хослолоор нийт 12 бие даасан тест кейс боловсруулсан. Таван алхмаас тестийн спецификаци боловсруулах алхам хамгийн их бодол шаардсан бөгөөд алдааны давхар хослолын хүлээгдэх үр дүнг зөв тодорхойлох шаардлагатай байсан. Оюутан байхгүй үед түүний төлөв болон үзсэн хичээлийг тодорхойлох боломжгүй тул ийм хослолыг утгагүй хослол гэж үзсэн. Тест бүр өөрийн setup болон oracle-тай учраас бусад тестийн өгөгдлөөс хамаарахгүй ажиллах боломжтой болсон. Newman ашиглан үндсэн Collection-ийг ажиллуулахад 65 assertion бүгд амжилттай болж, exit code 0 гарсан. FAIL туршилтаар зориуд буруу oracle оруулахад нэг assertion амжилтгүй болж, exit code 1 гарсан. DOWN туршилтаар серверийн холболтын алдааг илрүүлж, интерфейсийн алдаа болон oracle-ийн алдааны ялгааг баталгаажуулсан. Үндсэн 12 тестээр серверийн батлагдсан согог илрээгүй боловч AI шинжилгээгээр давтан бүртгэл болон өгөгдлийн төрөлтэй холбоотой нэмэлт шалгах боломжит асуудлууд тодорхойлогдсон. Postman болон Newman ашиглах нь API тестийг давтан ажиллуулах, үр дүнг баримтжуулах, CI quality gate хэрэгжүүлэхэд үр дүнтэй болохыг ойлгосон.



