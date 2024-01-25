python -m pip install --user virtualenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

cd ./Frontend && npm install
cd ..
