import time , os

print("[1] continue with setup")
print("[2] I have already done setup")
print(" CYBER OPERATING SYSTEM")
setup = input("[:?]")
if setup=='1' :
    name = input("Please enter your name to be displayed:")
    password = input("Please enter the password login:")

    lines = [name]
    with open("user/username.txt","w") as f:
        f.writelines(lines)
    lines2 = [password]
    with open("user/password.txt","w") as f:
        f.writelines(lines)
