# Colors
RED = \033[1;31m
GREEN = \033[1;32m
YELLOW = \033[1;33m
BLUE = \033[1;34m
RESET = \033[0m

all: credit build

build:
	@echo "$(BLUE)██████████████████████████ Building app ███████████████████████████$(RESET)"
	npm install
	npm run build
	npm run start

credit:
	@echo "$(YELLOW)██████████████████████████ Todo List ███████████████████████████$(RESET)"