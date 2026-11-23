# Анализ обработки Overclock Mode (Manual/Auto) в securityBios.js

## 1. ЭЛЕМЕНТ HTML (Overclock Mode)
**ID элемента:** `overClockMod`
**Переменная в коде:** `const overClock = document.getElementById("overClockMod");` (строка 269)

---

## 2. ОБРАБОТКА КЛИКА НА OVERCLOCK MODE
**Строка:** 3972 в контексте обработки клавиатуры
```javascript
if(overhyi.classList.contains("active")) {
    openAlertWindowLang();
}
```
**Условие:** Когда элемент overhyi (связанный с overclock) активен и нажата клавиша Enter на activeDisplay === 5

---

## 3. ОПЦИИ MANUAL И AUTO
**Индексы в массиве acceptMass:**
- **acceptMass[25]** = `"Auto"` (строка 56)
- **acceptMass[26]** = `"ManuaI"` (строка 57) - **ОПЕЧАТКА: ManuaI вместо Manual**

**Где загружаются опции:**
**Функция setupOpenBoot_6()** (строка 7278)
```javascript
function setupOpenBoot_6() {
    updateBoot(25, 26);  // Загружает Auto и Manual
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div");
    activeAlertOptionLang = 0;
    window.openSetupOpenBoot_6 = function() {
        alertElementLang.classList.remove("hidden");
        activeAlertOptionLang = 0;
        setupOpenBoot_6();
        var wewrw = document.getElementById("option1")
        wewrw.classList.add("active");
    }
}
```

**Функция updateBoot()** (строка 7140)
```javascript
function updateBoot(index1, index2, index3, ...){
    const alertDivs = document.querySelectorAll(".alerttext_1 div");
    alertDivs[0].textContent = acceptMass[index1]  // acceptMass[25] = "Auto"
    alertDivs[1].textContent = acceptMass[index2]  // acceptMass[26] = "ManuaI"
    ...
}
```

---

## 4. СОХРАНЕНИЕ ВЫБОРА В LOCALSTORAGE
**Где сохраняется:** Строка 5730
```javascript
if (document.querySelector("#option1").textContent.trim() === acceptMass[25] && activdisp10 === true && ...) {
    selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    const multivolElement = document.getElementById('multivol');
    if(multivolElement) {
        multivolElement.textContent = `[${selectedOption}]`;
        localStorage.setItem('multivolEl', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    }
}
```

**Ключ в localStorage:** `'multivolEl'`
**Значение:** `'[Auto]'` или `'[ManuaI]'` (с опечаткой)

---

## 5. ВОССТАНОВЛЕНИЕ ЗНАЧЕНИЯ ПОСЛЕ ПЕРЕЗАГРУЗКИ
**Функция:** `loadProfile(profileNumber)` (строка 7440)
**Место восстановления:** Строка 5510-5516
```javascript
if (profileData.multivolEl !== undefined) {
    const mv = profileData.multivolEl;
    document.getElementById('multivol').textContent = mv;
    const displayValue = mv === "[Auto]" ? "none" : mv === "[ManuaI]" ? "block" : "";
    if (displayValue) {
        ['cpuvol', 'multipvol', 'cpuvolnbb', 'multiNB', 'multipliercpu', 'multipar'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = displayValue;
        });
    }
}
```

**Процесс восстановления:**
1. При загрузке страницы вызывается `loadProfile(999)` (строка 498)
2. Значение `profileData.multivolEl` извлекается из `localStorage.getItem('profile999')`
3. Если значение `[Auto]`, элементы скрываются (display: none)
4. Если значение `[ManuaI]`, элементы показываются (display: block)

---

## 6. ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ selectedOption
**Объявление:** Строка 342
```javascript
let selectedOption = "123"; // Глобальная переменная, по умолчанию "Auto"
```

**Где устанавливается:** Строка 5718
```javascript
selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
```

**Где используется:**
- Строка 913: `if ((activeMenuItemIndex !== 2 && activeMenuItemIndex === 1) && selectedOption === "Manual")`
- Строка 922: `else if ((activeMenuItemIndex !== 2 && activeMenuItemIndex === 1) && selectedOption === "Auto")`
- Строка 5726: `element.style.display = selectedOption === "ManuaI" ? "block" : "none";`
- Строка 6054: `element.style.display = selectedOption === "Auto" ? "block" : "none";`

---

## 7. ФУНКЦИИ УПРАВЛЕНИЯ СОСТОЯНИЕМ
**Открытие диалога выбора Manual/Auto:**
- `openSetupOpenBoot_6()` - Открывает окно выбора для Manual/Auto (строка 4028, 4044)
- Вызывается когда `multipliervol.classList.contains("active")` и нажата клавиша Enter

**Навигация по опциям:**
- `navigateAlertWindowLang(direction)` (строка 7199 в контексте)

**Сохранение выбора:**
- Автоматически сохраняется в `localStorage` при выборе опции (строка 5730)

---

## РЕЗЮМЕ ПОТОКА ДАННЫХ

```
1. Пользователь нажимает Enter на activeDisplay === 10 и multipliervol активен
   ↓
2. Вызывается openSetupOpenBoot_6()
   ↓
3. updateBoot(25, 26) загружает "Auto" и "ManuaI" в alert окно
   ↓
4. Пользователь выбирает опцию стрелками и нажимает Enter
   ↓
5. selectedOption устанавливается в alertOptionsLang[activeAlertOptionLang].textContent
   ↓
6. Значение сохраняется в localStorage.setItem('multivolEl', [выбранное значение])
   ↓
7. При следующей загрузке страницы loadProfile(999) восстанавливает значение из localStorage
   ↓
8. Элементы показываются/скрываются в зависимости от выбранного значения
```

---

## ЭЛЕМЕНТЫ, ВИДИМОСТЬ КОТОРЫХ ЗАВИСИТ ОТ Manual/Auto

Эти элементы скрываются если выбран "Auto", показываются если выбран "ManuaI":
- `cpuvol` 
- `multipvol`
- `cpuvolnbb`
- `multiNB`
- `multipliercpu`
- `multipar`
