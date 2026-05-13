
content = open('src/App.jsx').read()
brace_count = 0
paren_count = 0
for i, line in enumerate(content.split('\n')):
    brace_count += line.count('{') - line.count('}')
    paren_count += line.count('(') - line.count(')')
    if brace_count < 0:
        print(f"Brace dropped below 0 at line {i+1}: {line.strip()}")
        brace_count = 0 # Reset to continue
    if paren_count < 0:
        print(f"Paren dropped below 0 at line {i+1}: {line.strip()}")
        paren_count = 0 # Reset to continue
print(f"Final: brace={brace_count}, paren={paren_count}")
