# DREAD Risk Assessment
## Scoring: 1 (Low) to 10 (High)

### 1. Broken Authentication
- **Damage Potential:** 9/10 (Full account compromise)
- **Reproducibility:** 7/10 (Predictable attack)
- **Exploitability:** 6/10 (Requires technical knowledge)
- **Affected Users:** 10/10 (All users)
- **Discoverability:** 5/10 (Needs testing)
- **Total Risk Score:** 37/50 (HIGH)
- **Mitigation:** JWT expiration, bcrypt hashing, rate limiting

### 2. Cross-Site Scripting (XSS)
- **Damage Potential:** 8/10 (Session hijacking)
- **Reproducibility:** 8/10 (Easy to replicate)
- **Exploitability:** 7/10 (Medium skill required)
- **Affected Users:** 8/10 (Most users)
- **Discoverability:** 8/10 (Easily discoverable)
- **Total Risk Score:** 39/50 (HIGH)
- **Mitigation:** Input validation, output encoding, CSP headers

### 3. SQL/NoSQL Injection
- **Damage Potential:** 9/10 (Data breach)
- **Reproducibility:** 6/10 (Depends on implementation)
- **Exploitability:** 5/10 (Requires specific knowledge)
- **Affected Users:** 9/10 (Database users)
- **Discoverability:** 6/10 (Needs probing)
- **Total Risk Score:** 35/50 (MEDIUM)
- **Mitigation:** Parameterized queries, input validation

### 4. Cross-Site Request Forgery (CSRF)
- **Damage Potential:** 7/10 (Unauthorized actions)
- **Reproducibility:** 8/10 (Easy with user interaction)
- **Exploitability:** 6/10 (Medium difficulty)
- **Affected Users:** 7/10 (Logged-in users)
- **Discoverability:** 7/10 (Moderately discoverable)
- **Total Risk Score:** 35/50 (MEDIUM)
- **Mitigation:** CSRF tokens, SameSite cookies

### 5. Insecure Direct Object References (IDOR)
- **Damage Potential:** 8/10 (Data access)
- **Reproducibility:** 9/10 (Very reproducible)
- **Exploitability:** 8/10 (Easy to exploit)
- **Affected Users:** 8/10 (Users with data)
- **Discoverability:** 8/10 (Easy to discover)
- **Total Risk Score:** 41/50 (CRITICAL)
- **Mitigation:** Access control checks, UUIDs instead of sequential IDs

## Risk Matrix
| Risk Level | Score Range | Threats |
|------------|-------------|---------|
| CRITICAL   | 40-50       | IDOR    |
| HIGH       | 30-39       | Broken Auth, XSS |
| MEDIUM     | 20-29       | SQLi, CSRF |
| LOW        | 10-19       | None identified |