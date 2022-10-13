# Note Spring Boot Knowledge

1. @GeneratedValue:
* Ví dụ sau đây ta khai báo khóa chính là kiểu số. Thì giá trị của trường studentId sẽ tự động tăng dần lên và nó là duy nhất trong table.
* Nếu khóa chính kiểu UUID ví dụ như UUID sau : 8dd5f315-9788-4d00-87bb-10eed9eff566. Giá trị này do thuật toán có trong UUID Generation sinh ra và là duy nhất.

2. @GeneratedValue (strategy = GenerationType.IDENTITY):
* Lúc này giá trị cửa studentId sẽ là 1,2,3,4,5 …

# Relationship table
1. 1...n
* 1: @OneToMany(mappedBy): một cart có nhiều item
* n: @ManyToOne(), JoinTable(), JoinColumn(): để định nghĩa cho biến (1) để tạo liên kết giữa hai entity.

2. Mối quan hệ @ManyToMany:
* Xác định ai là chủ trong quan hệ này.
* Nên cấu hình mối quan hệ hai chiều trong JPA, không nên cấu hình mối quan hệ một chiều. Chỉ rõ quan hệ với entity kia bởi thuộc tính nào?.
* Đồng bộ trạng thái giữa hai entity với nhau:
  -Dùng Cascade đúng.
  -.....???
  
  ## Fetch in Mapping:
   1. Eager and Lazy
   2. Default fetc types:
    + @OneToOne eager
    + @OneToMany lazy
    + @ManyToOne eager
    + @ManyToMany lazy
   3. best practice => use lazy loading

# Optional:
1. findById():
* tránh NullPointerException có .orElse() hoặc throw Error()

2. getById();
* trả về một object, nếu không lấy cận thận sẽ dính NullPointerException



# HIBERNATE

1. ORM: Object Relational Mapping
  * Kỹ thuật lập trình
  * Ánh xạ giữa các bảng trong db và các lớp đối tượng khi lập trình Java.
  * Giúp lập trình viên tập trung vào logic của bài toán thôi.
  * Hỗ trợ hầu hết mọi cơ sở dữ liệu.
  
2. Kiến trúc hibernate:
  * ![image](https://user-images.githubusercontent.com/56450869/194739596-59e4f154-b23f-441d-ba66-314dc2103044.png)
  
  
  
  
  
  
  
  
  
  
  
  
  Note create db for final project:
  + Role and Operation: những thành phần không đổi nên tạo ENUM trong BE.
  + Task Table: thiếu userId (1 task 1 người làm).
  + Comment Table: thiếu userId (ai comment trong cái comment đó).
  
  
