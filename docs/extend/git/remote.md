<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-03 10:54:54
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-08 18:02:39
-->

# GIT操作

1. 解除远程仓库

``` $ git remote rm github ```


2. 如何关联远程仓库

``` 1111 ```


3. [修改已提交的commit注释](https://www.jianshu.com/p/098d85a58bf1)
  1. 修改最后一次注释:
    输入 ``` git commit --amend ``` ，再输入 i 进入编辑模式，修改好注释后，按 Esc 键退出编辑模式，输入 :wq 保存并退出。

  2. 修改之前的某次注释
    输入 ``` git rebase -i HEAD~2 ```（ 2 表示定位到倒数第 2 次的修改），选择要编辑的栏，将"pick"改为"edit"，再同上进行修改，再输入 ``` git commit --amend ```，修改并保存后， 输入 ``` git rebase --continue ``` 即可。
  
  3. 修改之前的某几次注释
    同2，只是需要依次将每个注释进行修改。
  
  4. 修改已经push到远程仓库的注释
    先将最新代码pull下来
    再按照上述方法修改备注
    再输入 ``` git push --force origin master ``` 强制 push 到远端（确保本地已是最新代码）


参考：
