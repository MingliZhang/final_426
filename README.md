# final_426

To clone the repositorie:
1. copy the HTTPS address.
2. Open VScode, click on View, command palette
3. type in git:clone and hit enter. Then copy the HTTPS address into the text bar and hit enter.
4. click on open or open in new window.

To commit the repositorie 
1. save all files.
2. open terminal and type in the following commands:
3. git add . (with the .)
4. git sommit -m "PUT SOME MESSAGE HERE." 
5. Now your code have been commited.


To push the repositorie to github
1. Make sure you saved all your files and commited before doing the following.
2. Open terminal if not already opened.
3. Type in: git push.
4. You may need to login to github, if you need to, the window will pop up.

To pull the repositorie from github:
1. Make sure to do this before you start working or all work will be gone.
2. open terminal and type: git pull.

To creat a new branch:
1. Open terminal
2. type in: git checkout -b branchName.
3. Now you should be switched to the new branch.
4. You can type in: git checkout main(or other branch name) to get to other branches. However, save all files, commit them before switching.

To merge branches:
1. There are two types of merges, one is the fast-forward merge and the other that is not. In our situation, we will be using the not fast-forward merge.
2. In terminal, make sure you are at the main branch (or the branch you want the new git commit to be at).
3. Type in: git merge --no-ff branchName.
4. Commit and then do what ever you need.
5. Note: The none-fastforward merge does not "destroy" the branch being merged.

To check the branches:
1. In your terminal, type in: git branch --all
2. This will show all the local branches as well as which branch you are currently working on. It will be indecated using * sign.

To delete a branch:
1. Note: Deleting a branch locally does not mean the branch is also deleted remotely.
2. To delete a branch locally, in the terminal type in: git branch -d branchName.