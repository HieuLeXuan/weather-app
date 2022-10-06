# Note Spring Boot Knowledge

# @GeneratedValue:
+ Ví dụ sau đây ta khai báo khóa chính là kiểu số. Thì giá trị của trường studentId sẽ tự động tăng dần lên và nó là duy nhất trong table.
+ Nếu khóa chính kiểu UUID ví dụ như UUID sau : 8dd5f315-9788-4d00-87bb-10eed9eff566. Giá trị này do thuật toán có trong UUID Generation sinh ra và là duy nhất.

# @GeneratedValue (strategy = GenerationType.IDENTITY):
+ Lúc này giá trị cửa studentId sẽ là 1,2,3,4,5 …



# Relationship table
# 1...n
+1: @OneToMany: một cart có nhiều item
+n: @ManyToOne, JoinColumn: để định nghĩa cho biến (1) để tạo liên kết giữa hai entity.


# Optional:
+findById():
+tránh NullPointerException có .orElse() hoặc throw Error()

+getById();
+trả về một object, nếu không lấy cận thận sẽ dính NullPointerException
