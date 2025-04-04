Python Virtual Environment Setup Guide

## 1. Create virtual environment(For the first time)
**Make sure you are in Eventic (root) folder.** If you created it before, you can skip this step. But the name of folder should be "venv" since "venv" is ignored when to push by .gitignore. 
```bash
python -m venv venv
```

## 2. Activate virtual environment
```bash
source venv/bin/activate # Linux/macOS
```
```bash
.\venv\Scripts\activate # Windows
```

## 3. Install required module
```bash
pip install -r requirements.txt
```

## 4. Run flask api server
```bash
flask run
```

## 5. Update requirements.txt
If you install new modules to your venv, you need to update requirements.txt so that new environment can install all required modules for our flask api.
```bash
pip freeze > requirements.txt
```

## **Important Note:**
> ⚠️ **Please be careful when updating requirements.txt!** ⚠️
> 
> Before updating requirements.txt, ensure you have installed all existing modules:
> ```bash
> pip install -r requirements.txt
> ```
> 
> Then, install your new modules and update the file with:
> ```bash
> pip freeze > requirements.txt
> ```
>
> **If you skip installing existing modules first**, missing modules will be deleted from requirements.txt unintentionally.