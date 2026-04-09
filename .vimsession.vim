let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/narrio-project/narrio-frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +2 public/explore-content/The\ Cure\ for\ Execution\ Tax/The\ Cure\ for\ Execution\ Tax.md
badd +157 src/components/Explore.tsx
badd +346 src/components/MetallicPaint.tsx
badd +1 public/explore-content/Dopamine\ Serotonin\ Decisions/Dopamine-Serotonin-Decisions.md
badd +4 public/explore-content/Dopamine\ Serotonin\ Decisions/info.json
badd +1 public/explore-content/贪婪的多巴胺/info.json
badd +0 public/explore-content/AI这么强大了-我还需要和其他人类来往吗/info.json
badd +162 src/mockData.ts
argglobal
%argdel
edit src/mockData.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 100 + 100) / 200)
exe 'vert 2resize ' . ((&columns * 99 + 100) / 200)
argglobal
balt public/explore-content/贪婪的多巴胺/info.json
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
sil! 7,8fold
sil! 9,11fold
sil! 14,15fold
sil! 4,18fold
sil! 23,24fold
sil! 25,26fold
sil! 29,30fold
sil! 20,34fold
sil! 39,40fold
sil! 41,42fold
sil! 45,46fold
sil! 36,49fold
sil! 54,55fold
sil! 56,57fold
sil! 60,61fold
sil! 51,64fold
sil! 69,70fold
sil! 71,72fold
sil! 75,76fold
sil! 66,79fold
sil! 84,85fold
sil! 86,87fold
sil! 90,91fold
sil! 81,95fold
sil! 100,101fold
sil! 102,103fold
sil! 106,107fold
sil! 97,110fold
sil! 115,116fold
sil! 117,118fold
sil! 121,122fold
sil! 112,125fold
sil! 130,131fold
sil! 132,133fold
sil! 136,137fold
sil! 127,140fold
sil! 145,146fold
sil! 147,148fold
sil! 151,152fold
sil! 142,156fold
sil! 3,157fold
sil! 167,169fold
sil! 163,172fold
sil! 162,172fold
sil! 192,193fold
sil! 196,197fold
sil! 194,197fold
sil! 189,200fold
sil! 184,200fold
sil! 215,216fold
sil! 213,216fold
sil! 209,219fold
sil! 204,219fold
sil! 231,232fold
sil! 235,236fold
sil! 233,236fold
sil! 228,239fold
sil! 223,239fold
sil! 243,247fold
let &fdl = &fdl
162
sil! normal! zo
let s:l = 162 - ((19 * winheight(0) + 26) / 52)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 162
normal! 023|
wincmd w
argglobal
if bufexists(fnamemodify("public/explore-content/AI这么强大了-我还需要和其他人类来往吗/info.json", ":p")) | buffer public/explore-content/AI这么强大了-我还需要和其他人类来往吗/info.json | else | edit public/explore-content/AI这么强大了-我还需要和其他人类来往吗/info.json | endif
if &buftype ==# 'terminal'
  silent file public/explore-content/AI这么强大了-我还需要和其他人类来往吗/info.json
endif
balt public/explore-content/贪婪的多巴胺/info.json
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
sil! 1,3fold
let &fdl = &fdl
let s:l = 3 - ((2 * winheight(0) + 26) / 52)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 019|
wincmd w
exe 'vert 1resize ' . ((&columns * 100 + 100) / 200)
exe 'vert 2resize ' . ((&columns * 99 + 100) / 200)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
