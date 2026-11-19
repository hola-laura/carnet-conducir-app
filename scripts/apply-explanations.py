"""Merge reviewed explanations from data/explanations/*.json into the question bank.

Each batch file maps question id -> explanation text. Questions without a
reviewed explanation keep their old text, minus the boilerplate line the
source appends. Rewrites data/questions.json and js/questions-data.js.
"""
import glob
import json
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bank_path = os.path.join(root, 'data', 'questions.json')
bank = json.load(open(bank_path, encoding='utf-8'))

reviewed = {}
for path in sorted(glob.glob(os.path.join(root, 'data', 'explanations', '*.json'))):
    reviewed.update(json.load(open(path, encoding='utf-8')))

edits_path = os.path.join(root, 'data', 'question-edits.json')
edits = json.load(open(edits_path, encoding='utf-8')) if os.path.exists(edits_path) else {}

BOILERPLATE = '¿Crees que la respuesta es incorrecta?'
done = 0
for q in bank['questions']:
    edit = edits.get(q['id'])
    if edit:
        if 'question' in edit:
            q['question']['es'] = edit['question']
        if 'answers' in edit:
            q['answers'] = [{'es': a, 'en': ''} for a in edit['answers']]
        if 'correctIndex' in edit:
            q['correctIndex'] = edit['correctIndex']
        if 'image' in edit:
            if edit['image']:
                q['image'] = edit['image']
            else:
                q.pop('image', None)
    if q['id'] in reviewed:
        q['explanation'] = reviewed[q['id']]
        q.setdefault('review', {})['explanationReviewed'] = True
        done += 1
    else:
        q['explanation'] = q['explanation'].replace(BOILERPLATE, '').strip()

json.dump(bank, open(bank_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
with open(os.path.join(root, 'js', 'questions-data.js'), 'w', encoding='utf-8') as f:
    f.write('var QUESTIONS_DATA = ' + json.dumps(bank, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'{done} reviewed explanations, {len(edits)} edited questions')
